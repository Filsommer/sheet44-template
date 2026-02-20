import type {
  CandlePoint as Candle,
  EtoroApiErrorResponse,
  EtoroApiResponse,
  InstrumentCandles as CandlesData,
  MarketCandlesData,
} from "../../types";

export type { EtoroApiErrorResponse, Candle, CandlesData };

export type GetMarketCandlesResponse = EtoroApiResponse<MarketCandlesData>;
