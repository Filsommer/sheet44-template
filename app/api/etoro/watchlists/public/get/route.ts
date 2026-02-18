import { NextResponse } from "next/server";
import { extractCredentials, getPublicWatchlist } from "@/lib/etoro";

export async function GET(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const watchlistId = searchParams.get("watchlistId");
    if (!userId || !watchlistId) {
      return NextResponse.json({ error: "userId and watchlistId are required." }, { status: 400 });
    }
    const result = await getPublicWatchlist(credentials, userId, watchlistId);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
