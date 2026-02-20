import { NextResponse } from "next/server";
import { extractCredentials, getCandles } from "@/lib/etoro";
import type { GetMarketCandlesResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetMarketCandlesResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const instrumentId = searchParams.get("instrumentId");
    const direction = searchParams.get("direction");
    const interval = searchParams.get("interval");
    const candlesCount = searchParams.get("candlesCount");
    if (!instrumentId || !direction || !interval || !candlesCount) {
      return NextResponse.json({ error: "instrumentId, direction, interval, and candlesCount are required." }, { status: 400 });
    }
    const result = await getCandles(credentials, {
      instrumentId: Number(instrumentId),
      direction: direction as "asc" | "desc",
      interval,
      candlesCount: Number(candlesCount),
    });
    return NextResponse.json(result as GetMarketCandlesResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
