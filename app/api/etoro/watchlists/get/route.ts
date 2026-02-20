import { NextResponse } from "next/server";
import { extractCredentials, getWatchlist } from "@/lib/etoro";
import type { GetWatchlistsGetResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetWatchlistsGetResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const watchlistId = searchParams.get("watchlistId");
    if (!watchlistId) {
      return NextResponse.json({ error: "watchlistId is required." }, { status: 400 });
    }
    const result = await getWatchlist(credentials, {
      watchlistId,
      pageNumber: searchParams.has("pageNumber") ? Number(searchParams.get("pageNumber")) : undefined,
      itemsPerPage: searchParams.has("itemsPerPage") ? Number(searchParams.get("itemsPerPage")) : undefined,
    });
    return NextResponse.json(result as GetWatchlistsGetResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
