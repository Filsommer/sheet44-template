import { NextResponse } from "next/server";
import { extractCredentials, getPopularInvestorCopiers } from "@/lib/etoro";
import type { GetDiscoveryCopiersResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetDiscoveryCopiersResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const result = await getPopularInvestorCopiers(credentials);
    return NextResponse.json(result as GetDiscoveryCopiersResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
