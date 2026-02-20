import { NextResponse } from "next/server";
import { extractCredentials, getDefaultWatchlistItems } from "@/lib/etoro";
import type { DefaultWatchlistItemsResponse, EtoroApiErrorResponse } from "./types";


export async function GET(request: Request): Promise<NextResponse<DefaultWatchlistItemsResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const result = await getDefaultWatchlistItems(credentials, {
      itemsLimit: searchParams.has("itemsLimit") ? Number(searchParams.get("itemsLimit")) : undefined,
      itemsPerPage: searchParams.has("itemsPerPage") ? Number(searchParams.get("itemsPerPage")) : undefined,
    });
    return NextResponse.json(result as DefaultWatchlistItemsResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
