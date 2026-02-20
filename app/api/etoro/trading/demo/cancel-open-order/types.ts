import type { EtoroApiErrorResponse, EtoroApiResponse, TradingTokenData } from "../../../types";

export type { EtoroApiErrorResponse };

export type CancelOpenOrderData = TradingTokenData;

export type DeleteTradingDemoCancelOpenOrderResponse = EtoroApiResponse<TradingTokenData>;
