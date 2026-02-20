import type { MarketOpenByUnitsParams as LibMarketOpenByUnitsParams } from "@/lib/etoro";
import type { EtoroApiErrorResponse, EtoroApiResponse, TradingOpenOrderData, TradingOrderForOpen } from "../../../types";

export type MarketOpenByUnitsParams = LibMarketOpenByUnitsParams;

export type { EtoroApiErrorResponse };
export type MarketOpenOrderByUnits = TradingOrderForOpen;

export type PostTradingRealOpenByUnitsResponse = EtoroApiResponse<TradingOpenOrderData>;
