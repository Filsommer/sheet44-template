import { NextResponse } from "next/server";
import { extractCredentials, getMarketRecommendations } from "@/lib/etoro";
import type { MarketRecommendationsResponse, EtoroApiErrorResponse } from "./types";


export async function GET(
  request: Request,
): Promise<NextResponse<MarketRecommendationsResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const itemsCount = searchParams.get("itemsCount");
    if (!itemsCount) {
      return NextResponse.json({ error: "itemsCount is required." }, { status: 400 });
    }
    const result = await getMarketRecommendations(credentials, Number(itemsCount));
    return NextResponse.json(result as MarketRecommendationsResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
