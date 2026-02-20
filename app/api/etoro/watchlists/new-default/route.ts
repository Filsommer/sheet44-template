import { NextResponse } from "next/server";
import { extractCredentials, createNewAsDefaultWatchlist } from "@/lib/etoro";
import type { CreateNewDefaultWatchlistResponse, EtoroApiErrorResponse } from "./types";


export async function POST(request: Request): Promise<NextResponse<CreateNewDefaultWatchlistResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    if (!name) {
      return NextResponse.json({ error: "name is required." }, { status: 400 });
    }
    const result = await createNewAsDefaultWatchlist(credentials, {
      name,
      type: searchParams.get("type") ?? undefined,
      dynamicQuery: searchParams.get("dynamicQuery") ?? undefined,
    });
    return NextResponse.json(result as CreateNewDefaultWatchlistResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
