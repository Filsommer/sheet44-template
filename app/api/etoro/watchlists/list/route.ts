import { NextResponse } from "next/server";
import { extractCredentials, listWatchlists } from "@/lib/etoro";
import type { ListWatchlistsResponse, EtoroApiErrorResponse } from "./types";


export async function GET(request: Request): Promise<NextResponse<ListWatchlistsResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const result = await listWatchlists(credentials, {
      itemsPerPageForSingle: searchParams.has("itemsPerPageForSingle") ? Number(searchParams.get("itemsPerPageForSingle")) : undefined,
      ensureBuiltinWatchlists: searchParams.has("ensureBuiltinWatchlists") ? searchParams.get("ensureBuiltinWatchlists") === "true" : undefined,
      addRelatedAssets: searchParams.has("addRelatedAssets") ? searchParams.get("addRelatedAssets") === "true" : undefined,
    });
    return NextResponse.json(result as ListWatchlistsResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
