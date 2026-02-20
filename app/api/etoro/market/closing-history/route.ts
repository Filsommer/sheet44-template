import { NextResponse } from "next/server";
import { extractCredentials, getClosingPriceHistory } from "@/lib/etoro";
import type { GetMarketClosingHistoryResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetMarketClosingHistoryResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const result = await getClosingPriceHistory(credentials);
    return NextResponse.json(result as GetMarketClosingHistoryResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
