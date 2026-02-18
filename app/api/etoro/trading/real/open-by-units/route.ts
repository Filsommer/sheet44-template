import { NextResponse } from "next/server";
import { extractCredentials, openMarketOrderByUnits } from "@/lib/etoro";

export async function POST(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const body = await request.json();
    const result = await openMarketOrderByUnits(credentials, body, false);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
