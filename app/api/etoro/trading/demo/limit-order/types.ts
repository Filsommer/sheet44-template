import type { LimitOrderParams as LibLimitOrderParams } from "@/lib/etoro";
import type { EtoroApiErrorResponse, EtoroApiResponse, TradingTokenData } from "../../../types";

export type LimitOrderParams = LibLimitOrderParams;

export type { EtoroApiErrorResponse };
export type LimitOrderExecution = TradingTokenData;

export type PostTradingDemoLimitOrderResponse = EtoroApiResponse<TradingTokenData>;
