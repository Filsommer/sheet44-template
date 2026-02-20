import { NextResponse } from "next/server";
import { extractCredentials, getInstrumentTypes } from "@/lib/etoro";
import type { GetMarketInstrumentTypesResponse, EtoroApiErrorResponse } from "./types";

export async function GET(request: Request): Promise<NextResponse<GetMarketInstrumentTypesResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const result = await getInstrumentTypes(credentials);
    return NextResponse.json(result as GetMarketInstrumentTypesResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
