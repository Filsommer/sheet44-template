export type EtoroApiErrorResponse = { error: string };

export type WatchlistItem = {
  ItemId: number;
  ItemType: string;
  ItemRank: number;
};

export type DefaultWatchlistItemsResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: WatchlistItem[];
};
