import { NextResponse } from "next/server";
import { extractCredentials, searchPeople } from "@/lib/etoro";
import type { GetUsersSearchResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetUsersSearchResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period");
    if (!period) {
      return NextResponse.json({ error: "period is required." }, { status: 400 });
    }
    const result = await searchPeople(credentials, {
      period,
      page: searchParams.has("page") ? Number(searchParams.get("page")) : undefined,
      pageSize: searchParams.has("pageSize") ? Number(searchParams.get("pageSize")) : undefined,
      sort: searchParams.get("sort") ?? undefined,
      popularInvestor: searchParams.has("popularInvestor") ? searchParams.get("popularInvestor") === "true" : undefined,
      gainMax: searchParams.has("gainMax") ? Number(searchParams.get("gainMax")) : undefined,
      countryId: searchParams.has("countryId") ? Number(searchParams.get("countryId")) : undefined,
      instrumentId: searchParams.has("instrumentId") ? Number(searchParams.get("instrumentId")) : undefined,
      isTestAccount: searchParams.has("isTestAccount") ? searchParams.get("isTestAccount") === "true" : undefined,
    });
    return NextResponse.json(result as GetUsersSearchResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
