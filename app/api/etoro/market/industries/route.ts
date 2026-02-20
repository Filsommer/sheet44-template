import { NextResponse } from "next/server";
import { extractCredentials, getIndustries } from "@/lib/etoro";
import type { GetMarketIndustriesResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetMarketIndustriesResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const raw = searchParams.get("stocksIndustryIds");
    const stocksIndustryIds = raw ? raw.split(",").map(Number).filter((n) => !Number.isNaN(n)) : undefined;
    const result = await getIndustries(credentials, stocksIndustryIds);
    return NextResponse.json(result as GetMarketIndustriesResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
