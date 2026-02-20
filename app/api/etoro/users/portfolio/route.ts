import { NextResponse } from "next/server";
import { extractCredentials, getUserPortfolioLive } from "@/lib/etoro";
import type { GetUsersPortfolioResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetUsersPortfolioResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (!username) {
      return NextResponse.json({ error: "username is required." }, { status: 400 });
    }
    const result = await getUserPortfolioLive(credentials, username);
    return NextResponse.json(result as GetUsersPortfolioResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
