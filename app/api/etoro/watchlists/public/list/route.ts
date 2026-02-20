import { NextResponse } from "next/server";
import { extractCredentials, getPublicWatchlists } from "@/lib/etoro";
import type { PublicWatchlistsResponse, EtoroApiErrorResponse } from "./types";


export async function GET(request: Request): Promise<NextResponse<PublicWatchlistsResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "userId is required." }, { status: 400 });
    }
    const result = await getPublicWatchlists(credentials, userId);
    return NextResponse.json(result as PublicWatchlistsResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
