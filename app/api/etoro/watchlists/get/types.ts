import type { EtoroApiErrorResponse, EtoroApiResponse, WatchlistItem, WatchlistResponse as WatchlistDetails } from "../../types";

export type { EtoroApiErrorResponse, WatchlistItem, WatchlistDetails };

export type GetWatchlistsGetResponse = EtoroApiResponse<WatchlistDetails>;
