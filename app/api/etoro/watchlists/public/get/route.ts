import { NextResponse } from "next/server";
import { extractCredentials, getPublicWatchlist } from "@/lib/etoro";

type WatchlistItem = {
  ItemId: number;
  ItemType: string;
  ItemRank: number;
};

type Watchlist = {
  WatchlistId: string;
  Name: string;
  Gcid: number;
  WatchlistType: "Static" | "Dynamic";
  TotalItems: number;
  IsDefault: boolean;
  IsUserSelectedDefault: boolean;
  WatchlistRank: number;
  DynamicUrl: string;
  Items: WatchlistItem[];
  RelatedAssets: number[];
};

type PublicWatchlistResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: Watchlist;
};

export async function GET(request: Request): Promise<NextResponse<PublicWatchlistResponse | { error: string }>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const watchlistId = searchParams.get("watchlistId");
    if (!userId || !watchlistId) {
      return NextResponse.json({ error: "userId and watchlistId are required." }, { status: 400 });
    }
    const result = await getPublicWatchlist(credentials, userId, watchlistId);
    return NextResponse.json(result as PublicWatchlistResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
