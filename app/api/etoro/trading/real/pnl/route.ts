import { NextResponse } from "next/server";
import { extractCredentials, getPnl } from "@/lib/etoro";
import type { GetTradingRealPnlResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetTradingRealPnlResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const result = await getPnl(credentials, false);
    return NextResponse.json(result as GetTradingRealPnlResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
