import type { EtoroApiErrorResponse, EtoroApiResponse, TradingHistoryItem } from "../../types";

export type { EtoroApiErrorResponse, TradingHistoryItem as TradeHistoryItem };

export type TradeHistoryData = TradingHistoryItem[];

export type GetTradingHistoryResponse = EtoroApiResponse<TradeHistoryData>;
