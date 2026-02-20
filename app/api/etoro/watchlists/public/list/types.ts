export type EtoroApiErrorResponse = { error: string };

export type WatchlistItem = {
  ItemId: number;
  ItemType: string;
  ItemRank: number;
};

export type Watchlist = {
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

export type WatchlistsMetadata = {
  totalCount: number;
  maxItemsInWatchlist: number;
  maxWatchlistPerUser: number;
};

export type PublicWatchlistsResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: {
    watchlists: Watchlist[];
    metadata: WatchlistsMetadata;
  };
};
