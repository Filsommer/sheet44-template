import { NextResponse } from "next/server";
import { extractCredentials, getPopularInvestorCopiers } from "@/lib/etoro";

export async function GET(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const result = await getPopularInvestorCopiers(credentials);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
