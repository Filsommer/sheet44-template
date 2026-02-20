import type { EtoroApiErrorResponse, EtoroApiResponse, MarketSearchData, MarketSearchItem } from "../../types";

export type { EtoroApiErrorResponse, MarketSearchData, MarketSearchItem as MarketSearchInstrument };

export type GetMarketSearchResponse = EtoroApiResponse<MarketSearchData>;
