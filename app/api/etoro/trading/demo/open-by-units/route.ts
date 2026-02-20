import { NextResponse } from "next/server";
import { extractCredentials, openMarketOrderByUnits } from "@/lib/etoro";
import type { PostTradingDemoOpenByUnitsResponse, EtoroApiErrorResponse, MarketOpenByUnitsParams } from "./types";

export async function POST(request: Request): Promise<NextResponse<PostTradingDemoOpenByUnitsResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const body: MarketOpenByUnitsParams = await request.json();
    const result = await openMarketOrderByUnits(credentials, body, true);
    return NextResponse.json(result as PostTradingDemoOpenByUnitsResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
