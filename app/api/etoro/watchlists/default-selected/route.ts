import { NextResponse } from "next/server";
import { extractCredentials, setDefaultSelectedItems } from "@/lib/etoro";
import type { SetDefaultSelectedResponse, EtoroApiErrorResponse, SetDefaultSelectedItemsBody } from "./types";


export async function POST(request: Request): Promise<NextResponse<SetDefaultSelectedResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const items: SetDefaultSelectedItemsBody = await request.json();
    const result = await setDefaultSelectedItems(credentials, items);
    return NextResponse.json(result as SetDefaultSelectedResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
