export type EtoroApiErrorResponse = { error: string };

export type PostAttachmentImage = {
  width: number;
  height: number;
  url: string;
};

export type PostAttachmentVideo = {
  videoSourceId: string;
  videoSource: "None" | "YouTube" | "Vimeo";
  image: PostAttachmentImage;
};

export type PostAttachment = {
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

export type CreateFeedPostBody = {
  owner: number;
  message: string;
  tags?: {
    tags: Array<{ name: string; id: string }>;
  };
  mentions?: {
    mentions: Array<{ userName: string; id: string; isDirect: boolean }>;
  };
  attachments?: PostAttachment[];
};

export type FeedUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: {
    small?: string;
    medium?: string;
    large?: string;
  };
  roles: string[];
  isBlocked: boolean;
  isPrivate: boolean;
  countryCode: number;
  piLevel: number;
};

export type FeedMarket = {
  id: string;
  symbolName: string;
  displayName: string;
  assetType?: string;
  internalId?: number;
};

export type FeedPostMetadata = {
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
    user: {
      id: string;
      username?: string;
    };
  };
  poll?: {
    id: number;
    title: string;
    gcid: number;
    options: Array<{ id: number; text: string; votes?: number }>;
  };
};

export type FeedAttachment = {
  type: "image" | "video" | "link";
  url: string;
  thumbnailUrl: string;
  metadata: {
    width?: number;
    height?: number;
    durationSeconds?: number;
  };
};

export type FeedMention = {
  user: FeedUser;
  isDirect: boolean;
};

export type FeedPost = {
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

export type CreateFeedPostResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: FeedPost;
};
