import { NextResponse } from "next/server";
import { extractCredentials, getUserGain } from "@/lib/etoro";
import type { GetUsersGainResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetUsersGainResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (!username) {
      return NextResponse.json({ error: "username is required." }, { status: 400 });
    }
    const result = await getUserGain(credentials, username);
    return NextResponse.json(result as GetUsersGainResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
