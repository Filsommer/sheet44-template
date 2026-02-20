import { NextResponse } from "next/server";
import { extractCredentials, openMarketOrderByUnits } from "@/lib/etoro";
import type { PostTradingRealOpenByUnitsResponse, EtoroApiErrorResponse, MarketOpenByUnitsParams } from "./types";

export async function POST(request: Request): Promise<NextResponse<PostTradingRealOpenByUnitsResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const body: MarketOpenByUnitsParams = await request.json();
    const result = await openMarketOrderByUnits(credentials, body, false);
    return NextResponse.json(result as PostTradingRealOpenByUnitsResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
