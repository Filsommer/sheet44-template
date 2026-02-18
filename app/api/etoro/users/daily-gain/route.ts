import { NextResponse } from "next/server";
import { extractCredentials, getUserDailyGain } from "@/lib/etoro";

export async function GET(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const minDate = searchParams.get("minDate");
    const maxDate = searchParams.get("maxDate");
    const type = searchParams.get("type");
    if (!username || !minDate || !maxDate || !type) {
      return NextResponse.json({ error: "username, minDate, maxDate, and type are required." }, { status: 400 });
    }
    const result = await getUserDailyGain(credentials, username, { minDate, maxDate, type });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
