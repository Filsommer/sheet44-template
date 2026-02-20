import { NextResponse } from "next/server";
import { extractCredentials, getCuratedLists } from "@/lib/etoro";
import type { CuratedListsResponse, EtoroApiErrorResponse } from "./types";


export async function GET(request: Request): Promise<NextResponse<CuratedListsResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const result = await getCuratedLists(credentials);
    return NextResponse.json(result as CuratedListsResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
