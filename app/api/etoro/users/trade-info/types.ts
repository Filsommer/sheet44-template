import type { EtoroApiErrorResponse, EtoroApiResponse, UsersTradeInfoData as UserTradeInfoData } from "../../types";

export type { EtoroApiErrorResponse, UserTradeInfoData };

export type GetUsersTradeInfoResponse = EtoroApiResponse<UserTradeInfoData>;
