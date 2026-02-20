import { NextResponse } from "next/server";
import { extractCredentials, getUserTradeInfo } from "@/lib/etoro";
import type { GetUsersTradeInfoResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetUsersTradeInfoResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const period = searchParams.get("period");
    if (!username || !period) {
      return NextResponse.json({ error: "username and period are required." }, { status: 400 });
    }
    const result = await getUserTradeInfo(credentials, username, period);
    return NextResponse.json(result as GetUsersTradeInfoResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
