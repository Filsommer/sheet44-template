import { NextResponse } from "next/server";
import { extractCredentials, deleteWatchlist } from "@/lib/etoro";
import type { EtoroApiErrorResponse } from "./types";

export async function DELETE(request: Request): Promise<NextResponse<null | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const watchlistId = searchParams.get("watchlistId");
    if (!watchlistId) {
      return NextResponse.json({ error: "watchlistId is required." }, { status: 400 });
    }
    await deleteWatchlist(credentials, watchlistId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
