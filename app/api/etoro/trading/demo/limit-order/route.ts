import { NextResponse } from "next/server";
import { extractCredentials, createLimitOrder } from "@/lib/etoro";
import type { PostTradingDemoLimitOrderResponse, EtoroApiErrorResponse, LimitOrderParams } from "./types";

export async function POST(request: Request): Promise<NextResponse<PostTradingDemoLimitOrderResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const body: LimitOrderParams = await request.json();
    const result = await createLimitOrder(credentials, body, true);
    return NextResponse.json(result as PostTradingDemoLimitOrderResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
