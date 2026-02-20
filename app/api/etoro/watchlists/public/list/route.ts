import { NextResponse } from "next/server";
import { extractCredentials, getPublicWatchlists } from "@/lib/etoro";

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

type WatchlistsMetadata = {
  totalCount: number;
  maxItemsInWatchlist: number;
  maxWatchlistPerUser: number;
};

type PublicWatchlistsResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: {
    watchlists: Watchlist[];
    metadata: WatchlistsMetadata;
  };
};

export async function GET(request: Request): Promise<NextResponse<PublicWatchlistsResponse | { error: string }>> {
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
