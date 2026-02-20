import { NextResponse } from "next/server";
import { extractCredentials, setUserDefaultWatchlist } from "@/lib/etoro";

export async function PUT(request: Request): Promise<NextResponse<{ error: string } | null>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const watchlistId = searchParams.get("watchlistId");
    if (!watchlistId) {
      return NextResponse.json({ error: "watchlistId is required." }, { status: 400 });
    }
    await setUserDefaultWatchlist(credentials, watchlistId);
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
