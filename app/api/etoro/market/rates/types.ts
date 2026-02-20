import type { EtoroApiErrorResponse, EtoroApiResponse, MarketRate, MarketRatesData } from "../../types";

export type { EtoroApiErrorResponse, MarketRate };

export type GetMarketRatesResponse = EtoroApiResponse<MarketRatesData>;
