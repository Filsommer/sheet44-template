import { NextResponse } from "next/server";
import { extractCredentials, getInstrumentFeed } from "@/lib/etoro";

export async function GET(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const marketId = searchParams.get("marketId");
    if (!marketId) {
      return NextResponse.json({ error: "marketId is required." }, { status: 400 });
    }
    const result = await getInstrumentFeed(credentials, marketId, {
      requesterUserId: searchParams.get("requesterUserId") ?? undefined,
      take: searchParams.has("take") ? Number(searchParams.get("take")) : undefined,
      offset: searchParams.has("offset") ? Number(searchParams.get("offset")) : undefined,
      badgesExperimentIsEnabled: searchParams.has("badgesExperimentIsEnabled") ? searchParams.get("badgesExperimentIsEnabled") === "true" : undefined,
      reactionsPageSize: searchParams.has("reactionsPageSize") ? Number(searchParams.get("reactionsPageSize")) : undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
