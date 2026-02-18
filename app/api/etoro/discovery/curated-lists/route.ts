import { NextResponse } from "next/server";
import { extractCredentials, getCuratedLists } from "@/lib/etoro";

export async function GET(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const result = await getCuratedLists(credentials);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
