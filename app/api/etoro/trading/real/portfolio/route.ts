import { NextResponse } from "next/server";
import { extractCredentials, getPortfolio } from "@/lib/etoro";
import type { GetTradingRealPortfolioResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetTradingRealPortfolioResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const result = await getPortfolio(credentials, false);
    return NextResponse.json(result as GetTradingRealPortfolioResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
