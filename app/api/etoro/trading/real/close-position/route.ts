import { NextResponse } from "next/server";
import { extractCredentials, closePosition } from "@/lib/etoro";
import type { PostTradingRealClosePositionResponse, EtoroApiErrorResponse, ClosePositionParams } from "./types";

export async function POST(request: Request): Promise<NextResponse<PostTradingRealClosePositionResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const body: ClosePositionParams = await request.json();
    const result = await closePosition(credentials, body, false);
    return NextResponse.json(result as PostTradingRealClosePositionResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
