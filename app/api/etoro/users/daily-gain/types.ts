import type {
  EtoroApiErrorResponse,
  EtoroApiResponse,
  GainEntry as UserDailyGainEntry,
  UsersDailyGainData as UserDailyGainData,
} from "../../types";

export type { EtoroApiErrorResponse, UserDailyGainEntry, UserDailyGainData };

export type GetUsersDailyGainResponse = EtoroApiResponse<UserDailyGainData>;
