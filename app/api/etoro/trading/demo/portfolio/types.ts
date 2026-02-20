import type { EtoroApiErrorResponse, EtoroApiResponse, TradingClientPortfolio, TradingPortfolioData } from "../../../types";

export type { EtoroApiErrorResponse };
export type TradingPosition = TradingClientPortfolio["positions"] extends (infer T)[] ? T : never;
export type TradingOrder = TradingClientPortfolio["pendingOrders"] extends (infer T)[] ? T : never;

export type GetTradingDemoPortfolioResponse = EtoroApiResponse<TradingPortfolioData>;
