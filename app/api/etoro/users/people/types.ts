import type { EtoroApiErrorResponse, EtoroApiResponse, UserProfile, UsersPeopleData as PeopleData } from "../../types";

export type { EtoroApiErrorResponse, UserProfile, PeopleData };

export type GetUsersPeopleResponse = EtoroApiResponse<PeopleData>;
