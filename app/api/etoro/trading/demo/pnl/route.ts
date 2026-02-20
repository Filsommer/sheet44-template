import { NextResponse } from "next/server";
import { extractCredentials, getPnl } from "@/lib/etoro";
import type { GetTradingDemoPnlResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetTradingDemoPnlResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const result = await getPnl(credentials, true);
    return NextResponse.json(result as GetTradingDemoPnlResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
