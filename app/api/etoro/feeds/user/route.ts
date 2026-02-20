import { NextResponse } from "next/server";
import { extractCredentials, getUserFeed } from "@/lib/etoro";

type FeedUserAvatar = {
  small: string;
  medium: string;
  large: string;
};

type FeedPostOwner = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: FeedUserAvatar;
  roles: string[];
  isBlocked: boolean;
  isPrivate: boolean;
  countryCode: number;
  piLevel: number;
};

type FeedPostTagMarket = {
  id: string;
  symbolName: string;
  displayName: string;
  updated: string;
  assetType: string;
  internalId: number;
  avatar: Record<string, unknown>;
  application: string;
  metadata: string;
};

type FeedPost = {
  id: string;
  owner: FeedPostOwner;
  message: {
    text: string;
    languageCode: string;
  };
  created: string;
  updated: string;
  type: string;
  attachments: Record<string, unknown>[];
  tags: { market: FeedPostTagMarket }[];
};

type FeedComment = {
  entity: Record<string, unknown>;
  repliesCount: number;
  emotionsData: Record<string, unknown>;
  requesterContext: Record<string, unknown>;
};

type FeedCommentsData = {
  reactionPaging: {
    totalCount: number;
  };
  comments: FeedComment[];
};

type FeedDiscussion = {
  id: string;
  post: FeedPost;
  commentsData: FeedCommentsData;
  emotionsData: Record<string, unknown>;
  requesterContext: Record<string, unknown>;
  summary: {
    totalCommentsAndReplies: number;
    sharedCount: number;
  };
};

type FeedPaging = {
  next: string;
  offSet: number;
  take: number;
  version: string;
};

type FeedMetadata = {
  experimentName: string;
  streamType: string;
  designatedStreamType: string;
};

type UserFeedResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: {
    discussions: FeedDiscussion[];
    paging: FeedPaging;
    metadata: FeedMetadata;
  };
};

export async function GET(request: Request): Promise<NextResponse<UserFeedResponse | { error: string }>> {
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
    return NextResponse.json(result as UserFeedResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
