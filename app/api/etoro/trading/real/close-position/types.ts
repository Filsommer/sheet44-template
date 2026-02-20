import type { ClosePositionParams as LibClosePositionParams } from "@/lib/etoro";
import type { EtoroApiErrorResponse, EtoroApiResponse, TradingCloseOrderData, TradingOrderForClose } from "../../../types";

export type ClosePositionParams = LibClosePositionParams;

export type { EtoroApiErrorResponse };
export type ClosePositionExecution = TradingOrderForClose;

export type PostTradingRealClosePositionResponse = EtoroApiResponse<TradingCloseOrderData>;
