import { NextResponse } from "next/server";
import { extractCredentials, getInstrumentsMetadata } from "@/lib/etoro";

function toNumberArray(value: string | null): number[] | undefined {
  if (!value) return undefined;
  return value.split(",").map(Number).filter((n) => !Number.isNaN(n));
}

export async function GET(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const result = await getInstrumentsMetadata(credentials, {
      instrumentIds: toNumberArray(searchParams.get("instrumentIds")),
      exchangeIds: toNumberArray(searchParams.get("exchangeIds")),
      stocksIndustryIds: toNumberArray(searchParams.get("stocksIndustryIds")),
      instrumentTypeIds: toNumberArray(searchParams.get("instrumentTypeIds")),
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
