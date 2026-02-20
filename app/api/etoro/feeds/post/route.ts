import { NextResponse } from "next/server";
import { extractCredentials, createFeedPost } from "@/lib/etoro";

type PostAttachmentImage = {
  width: number;
  height: number;
  url: string;
};

type PostAttachmentVideo = {
  videoSourceId: string;
  videoSource: "None" | "YouTube" | "Vimeo";
  image: PostAttachmentImage;
};

type PostAttachment = {
  url: string;
  title: string;
  host: string;
  description: string;
  mediaType: "None" | "Image" | "Video";
  media: {
    image: PostAttachmentImage;
    video: PostAttachmentVideo;
  };
};

type CreateFeedPostBody = {
  owner: number;
  message: string;
  tags?: {
    tags: Record<string, unknown>[];
  };
  mentions?: {
    mentions: Record<string, unknown>[];
  };
  attachments?: PostAttachment[];
};

type FeedUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: Record<string, unknown>;
  roles: string[];
  isBlocked: boolean;
  isPrivate: boolean;
  countryCode: number;
  piLevel: number;
};

type FeedMarket = Record<string, unknown>;

type FeedPostMetadata = {
  share?: {
    sharedPost: string;
    sharedOriginPost: string;
  };
  marketEvent?: {
    earningReportId: number;
    market: FeedMarket;
    stocksIndustryId: number;
    earningsDate: string;
    isBeforeMarketOpen: boolean;
    earningsYear: number;
    earningsQuarter: number;
    verified: boolean;
    marketCap: number;
    estimatedEps: number;
    estimatedSales: number;
    tagName: string;
    textKey: number;
  };
  trade?: {
    type: "Open";
    positionId: number;
    market: FeedMarket;
    gain: number;
    rate: number;
    direction: "Long";
  };
  order?: {
    type: "Open";
    orderId: number;
    market: FeedMarket;
    rate: number;
    direction: "Long";
  };
  copy?: {
    type: "Start";
    user: Record<string, unknown>;
  };
  poll?: {
    id: number;
    title: string;
    gcid: number;
    options: Record<string, unknown>[];
  };
};

type FeedAttachment = {
  type: "image" | "video" | "link";
  url: string;
  thumbnailUrl: string;
  metadata: Record<string, unknown>;
};

type FeedMention = {
  user: FeedUser;
  isDirect: boolean;
};

type FeedPost = {
  id: string;
  owner: FeedUser;
  obsoleteId: string;
  created: string;
  message: {
    text: string;
    languageCode: string;
  };
  updated: string;
  isDeleted: boolean;
  type: "Default";
  metadata: FeedPostMetadata;
  attachments: FeedAttachment[];
  tags: { market: FeedMarket }[];
  mentions: FeedMention[];
  isSpam: boolean;
  editStatus: "None" | "Edited" | "Moderated";
};

type CreateFeedPostResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: FeedPost;
};

export async function POST(request: Request): Promise<NextResponse<CreateFeedPostResponse | { error: string }>> {
  try {
    const credentials = extractCredentials(request);
    const body = await request.json() as CreateFeedPostBody;
    const result = await createFeedPost(credentials, body);
    return NextResponse.json(result as CreateFeedPostResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
