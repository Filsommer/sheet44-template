import type {
  EtoroApiErrorResponse,
  EtoroApiResponse,
  MarketIndustriesData,
  MarketStocksIndustry as MarketIndustry,
} from "../../types";

export type { EtoroApiErrorResponse, MarketIndustry };

export type GetMarketIndustriesResponse = EtoroApiResponse<MarketIndustriesData>;
