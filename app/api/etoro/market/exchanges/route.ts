import { NextResponse } from "next/server";
import { extractCredentials, getExchanges } from "@/lib/etoro";
import type { GetMarketExchangesResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetMarketExchangesResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const raw = searchParams.get("exchangeIds");
    const exchangeIds = raw ? raw.split(",").map(Number).filter((n) => !Number.isNaN(n)) : undefined;
    const result = await getExchanges(credentials, exchangeIds);
    return NextResponse.json(result as GetMarketExchangesResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
