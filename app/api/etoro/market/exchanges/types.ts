import type {
  EtoroApiErrorResponse,
  EtoroApiResponse,
  MarketExchangeInfo as MarketExchange,
  MarketExchangesData,
} from "../../types";

export type { EtoroApiErrorResponse, MarketExchange };

export type GetMarketExchangesResponse = EtoroApiResponse<MarketExchangesData>;
