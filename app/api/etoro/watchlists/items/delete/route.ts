import { NextResponse } from "next/server";
import { extractCredentials, deleteWatchlistItems } from "@/lib/etoro";

export async function DELETE(request: Request): Promise<NextResponse<{ error: string } | null>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const watchlistId = searchParams.get("watchlistId");
    if (!watchlistId) {
      return NextResponse.json({ error: "watchlistId is required." }, { status: 400 });
    }
    const items = await request.json();
    await deleteWatchlistItems(credentials, watchlistId, items);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
