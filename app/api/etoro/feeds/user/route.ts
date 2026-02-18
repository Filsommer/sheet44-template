import { NextResponse } from "next/server";
import { extractCredentials, getUserFeed } from "@/lib/etoro";

export async function GET(request: Request) {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "userId is required." }, { status: 400 });
    }
    const result = await getUserFeed(credentials, userId, {
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
