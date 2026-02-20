import { NextResponse } from "next/server";
import { extractCredentials, searchInstruments } from "@/lib/etoro";
import type { GetMarketSearchResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetMarketSearchResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const fields = searchParams.get("fields");
    if (!fields) {
      return NextResponse.json({ error: "fields is required." }, { status: 400 });
    }
    const result = await searchInstruments(credentials, {
      fields,
      internalSymbolFull: searchParams.get("internalSymbolFull") ?? undefined,
      displayname: searchParams.get("displayname") ?? undefined,
      popularityUniques7Day: searchParams.get("popularityUniques7Day") ?? undefined,
      searchText: searchParams.get("searchText") ?? undefined,
      pageSize: searchParams.has("pageSize") ? Number(searchParams.get("pageSize")) : undefined,
      pageNumber: searchParams.has("pageNumber")
        ? Number(searchParams.get("pageNumber"))
        : undefined,
      sort: searchParams.get("sort") ?? undefined,
    });
    return NextResponse.json(result as GetMarketSearchResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
