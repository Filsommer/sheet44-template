import { NextResponse } from "next/server";
import { extractCredentials, getPeople } from "@/lib/etoro";
import type { GetUsersPeopleResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetUsersPeopleResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const result = await getPeople(credentials, {
      usernames: searchParams.get("usernames") ?? undefined,
      cidList: searchParams.get("cidList") ?? undefined,
    });
    return NextResponse.json(result as GetUsersPeopleResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
