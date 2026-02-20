import type { MarketOpenByAmountParams as LibMarketOpenByAmountParams } from "@/lib/etoro";
import type { EtoroApiErrorResponse, EtoroApiResponse, TradingOpenOrderData, TradingOrderForOpen } from "../../../types";

export type MarketOpenByAmountParams = LibMarketOpenByAmountParams;

export type { EtoroApiErrorResponse };
export type MarketOpenOrder = TradingOrderForOpen;

export type PostTradingRealOpenByAmountResponse = EtoroApiResponse<TradingOpenOrderData>;
