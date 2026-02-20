import { NextResponse } from "next/server";
import { extractCredentials, getPortfolio } from "@/lib/etoro";
import type { GetTradingDemoPortfolioResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetTradingDemoPortfolioResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const result = await getPortfolio(credentials, true);
    return NextResponse.json(result as GetTradingDemoPortfolioResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
