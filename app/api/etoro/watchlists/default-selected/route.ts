import { NextResponse } from "next/server";
import { extractCredentials, setDefaultSelectedItems } from "@/lib/etoro";

export async function POST(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const items = await request.json();
    const result = await setDefaultSelectedItems(credentials, items);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
