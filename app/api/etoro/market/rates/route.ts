import { NextResponse } from "next/server";
import { extractCredentials, getLiveRates } from "@/lib/etoro";
import type { GetMarketRatesResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetMarketRatesResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const raw = searchParams.get("instrumentIds");
    if (!raw) {
      return NextResponse.json({ error: "instrumentIds is required." }, { status: 400 });
    }
    const instrumentIds = raw.split(",").map(Number).filter((n) => !Number.isNaN(n));
    const result = await getLiveRates(credentials, instrumentIds);
    return NextResponse.json(result as GetMarketRatesResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
