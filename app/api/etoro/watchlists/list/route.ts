import { NextResponse } from "next/server";
import { extractCredentials, listWatchlists } from "@/lib/etoro";

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

type ListWatchlistsResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: {
    watchlists: Watchlist[];
    metadata: WatchlistsMetadata;
  };
};

export async function GET(request: Request): Promise<NextResponse<ListWatchlistsResponse | { error: string }>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const result = await listWatchlists(credentials, {
      itemsPerPageForSingle: searchParams.has("itemsPerPageForSingle") ? Number(searchParams.get("itemsPerPageForSingle")) : undefined,
      ensureBuiltinWatchlists: searchParams.has("ensureBuiltinWatchlists") ? searchParams.get("ensureBuiltinWatchlists") === "true" : undefined,
      addRelatedAssets: searchParams.has("addRelatedAssets") ? searchParams.get("addRelatedAssets") === "true" : undefined,
    });
    return NextResponse.json(result as ListWatchlistsResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
