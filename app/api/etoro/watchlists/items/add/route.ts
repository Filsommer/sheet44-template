import { NextResponse } from "next/server";
import { extractCredentials, addWatchlistItems } from "@/lib/etoro";

export async function POST(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const watchlistId = searchParams.get("watchlistId");
    if (!watchlistId) {
      return NextResponse.json({ error: "watchlistId is required." }, { status: 400 });
    }
    const items = await request.json();
    const result = await addWatchlistItems(credentials, watchlistId, items);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
