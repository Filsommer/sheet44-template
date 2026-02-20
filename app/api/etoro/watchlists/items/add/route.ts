import { NextResponse } from "next/server";
import { extractCredentials, addWatchlistItems } from "@/lib/etoro";
import type { EtoroApiErrorResponse, WatchlistItemDto } from "./types";

export async function POST(request: Request): Promise<NextResponse<null | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const watchlistId = searchParams.get("watchlistId");
    if (!watchlistId) {
      return NextResponse.json({ error: "watchlistId is required." }, { status: 400 });
    }
    const items: WatchlistItemDto[] = await request.json();
    await addWatchlistItems(credentials, watchlistId, items);
    return new NextResponse(null, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
