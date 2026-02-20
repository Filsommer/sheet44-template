import type { ClosingHistoryItem as ClosingHistoryPoint, EtoroApiErrorResponse, EtoroApiResponse } from "../../types";

export type { EtoroApiErrorResponse, ClosingHistoryPoint };

export type GetMarketClosingHistoryResponse = EtoroApiResponse<ClosingHistoryPoint[]>;
