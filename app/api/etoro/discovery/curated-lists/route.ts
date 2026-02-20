import { NextResponse } from "next/server";
import { extractCredentials, getCuratedLists } from "@/lib/etoro";

type CuratedListItem = {
  instrumentId: number;
};

type CuratedList = {
  uuid: string;
  name: string;
  description: string;
  listImageUrl: string;
  items: CuratedListItem[];
};

type CuratedListsResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: {
    curatedLists: CuratedList[];
  };
};

export async function GET(request: Request): Promise<NextResponse<CuratedListsResponse | { error: string }>> {
  try {
    const credentials = extractCredentials(request);
    const result = await getCuratedLists(credentials);
    return NextResponse.json(result as CuratedListsResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
