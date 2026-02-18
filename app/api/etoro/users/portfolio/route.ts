import { NextResponse } from "next/server";
import { extractCredentials, getUserPortfolioLive } from "@/lib/etoro";

export async function GET(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (!username) {
      return NextResponse.json({ error: "username is required." }, { status: 400 });
    }
    const result = await getUserPortfolioLive(credentials, username);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
