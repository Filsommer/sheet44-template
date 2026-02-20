import { NextResponse } from "next/server";
import { extractCredentials, createWatchlist } from "@/lib/etoro";

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

type CreateWatchlistResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: Watchlist;
};

export async function POST(request: Request): Promise<NextResponse<CreateWatchlistResponse | { error: string }>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    if (!name) {
      return NextResponse.json({ error: "name is required." }, { status: 400 });
    }
    const result = await createWatchlist(credentials, {
      name,
      type: searchParams.get("type") ?? undefined,
      dynamicQuery: searchParams.get("dynamicQuery") ?? undefined,
    });
    return NextResponse.json(result as CreateWatchlistResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
