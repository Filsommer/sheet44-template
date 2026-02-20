import type { EtoroApiErrorResponse, EtoroApiResponse, TradingPortfolioData } from "../../../types";

export type { EtoroApiErrorResponse };
export type TradingPnlData = TradingPortfolioData;

export type GetTradingDemoPnlResponse = EtoroApiResponse<TradingPortfolioData>;
