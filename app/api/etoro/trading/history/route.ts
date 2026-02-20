import { NextResponse } from "next/server";
import { extractCredentials, getTradeHistory } from "@/lib/etoro";
import type { GetTradingHistoryResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetTradingHistoryResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const minDate = searchParams.get("minDate");
    if (!minDate) {
      return NextResponse.json({ error: "minDate is required." }, { status: 400 });
    }
    const result = await getTradeHistory(credentials, {
      minDate,
      page: searchParams.has("page") ? Number(searchParams.get("page")) : undefined,
      pageSize: searchParams.has("pageSize") ? Number(searchParams.get("pageSize")) : undefined,
    });
    return NextResponse.json(result as GetTradingHistoryResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
