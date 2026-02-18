import { NextResponse } from "next/server";
import { extractCredentials, renameWatchlist } from "@/lib/etoro";

export async function PUT(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const watchlistId = searchParams.get("watchlistId");
    const newName = searchParams.get("newName");
    if (!watchlistId || !newName) {
      return NextResponse.json({ error: "watchlistId and newName are required." }, { status: 400 });
    }
    const result = await renameWatchlist(credentials, watchlistId, newName);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
