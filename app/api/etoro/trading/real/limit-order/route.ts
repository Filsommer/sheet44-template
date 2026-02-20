import { NextResponse } from "next/server";
import { extractCredentials, createLimitOrder } from "@/lib/etoro";
import type { PostTradingRealLimitOrderResponse, EtoroApiErrorResponse, LimitOrderParams } from "./types";

export async function POST(request: Request): Promise<NextResponse<PostTradingRealLimitOrderResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const body: LimitOrderParams = await request.json();
    const result = await createLimitOrder(credentials, body, false);
    return NextResponse.json(result as PostTradingRealLimitOrderResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
