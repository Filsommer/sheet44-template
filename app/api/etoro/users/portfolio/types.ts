import type { EtoroApiErrorResponse, EtoroApiResponse, UsersPortfolioLiveData as UserPortfolioData } from "../../types";

export type { EtoroApiErrorResponse, UserPortfolioData };

export type UserPortfolioPosition = UserPortfolioData["positions"] extends (infer T)[] ? T : never;

export type GetUsersPortfolioResponse = EtoroApiResponse<UserPortfolioData>;
