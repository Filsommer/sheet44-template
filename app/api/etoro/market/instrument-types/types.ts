import type {
  EtoroApiErrorResponse,
  EtoroApiResponse,
  MarketInstrumentTypeInfo as MarketInstrumentType,
  MarketInstrumentTypesData,
} from "../../types";

export type { EtoroApiErrorResponse, MarketInstrumentType };

export type GetMarketInstrumentTypesResponse = EtoroApiResponse<MarketInstrumentTypesData>;
