import { NextResponse } from "next/server";
import { extractCredentials, setDefaultSelectedItems } from "@/lib/etoro";

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

type SetDefaultSelectedResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: Watchlist;
};

export async function POST(request: Request): Promise<NextResponse<SetDefaultSelectedResponse | { error: string }>> {
  try {
    const credentials = extractCredentials(request);
    const items = await request.json();
    const result = await setDefaultSelectedItems(credentials, items);
    return NextResponse.json(result as SetDefaultSelectedResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
