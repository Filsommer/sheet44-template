import { NextResponse } from "next/server";
import { extractCredentials, createFeedPost } from "@/lib/etoro";
import type { CreateFeedPostResponse, EtoroApiErrorResponse, CreateFeedPostBody } from "./types";


export async function POST(request: Request): Promise<NextResponse<CreateFeedPostResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const body: CreateFeedPostBody = await request.json();
    const result = await createFeedPost(credentials, body);
    return NextResponse.json(result as CreateFeedPostResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
