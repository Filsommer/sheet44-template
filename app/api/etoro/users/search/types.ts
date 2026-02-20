import type { EtoroApiErrorResponse, EtoroApiResponse, UsersSearchData as UserSearchData, UsersSearchItem as UserSearchResult } from "../../types";

export type { EtoroApiErrorResponse, UserSearchResult, UserSearchData };

export type GetUsersSearchResponse = EtoroApiResponse<UserSearchData>;
