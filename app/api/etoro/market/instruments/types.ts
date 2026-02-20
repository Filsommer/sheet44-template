import type {
  EtoroApiErrorResponse,
  EtoroApiResponse,
  MarketInstrumentDisplayData as MarketInstrument,
  MarketInstrumentsData,
} from "../../types";

export type { EtoroApiErrorResponse, MarketInstrument };

export type GetMarketInstrumentsResponse = EtoroApiResponse<MarketInstrumentsData>;
