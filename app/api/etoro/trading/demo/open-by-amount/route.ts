import { NextResponse } from "next/server";
import { extractCredentials, openMarketOrderByAmount } from "@/lib/etoro";
import type { PostTradingDemoOpenByAmountResponse, EtoroApiErrorResponse, MarketOpenByAmountParams } from "./types";

export async function POST(request: Request): Promise<NextResponse<PostTradingDemoOpenByAmountResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const body: MarketOpenByAmountParams = await request.json();
    const result = await openMarketOrderByAmount(credentials, body, true);
    return NextResponse.json(result as PostTradingDemoOpenByAmountResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
