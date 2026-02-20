export type EtoroApiErrorResponse = { error: string };

export type FeedUserAvatar = {
  small: string;
  medium: string;
  large: string;
};

export type FeedPostOwner = {
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

export type FeedPostTagMarket = {
  id: string;
  symbolName: string;
  displayName: string;
  updated: string;
  assetType: string;
  internalId: number;
  avatar: FeedUserAvatar;
  application: string;
  metadata: string;
};

export type FeedAttachment = {
  type: "image" | "video" | "link";
  url: string;
  thumbnailUrl?: string;
};

export type FeedPost = {
  id: string;
  owner: FeedPostOwner;
  message: {
    text: string;
    languageCode: string;
  };
  created: string;
  updated: string;
  type: string;
  attachments: FeedAttachment[];
  tags: { market: FeedPostTagMarket }[];
};

export type FeedComment = {
  entity: FeedPost;
  repliesCount: number;
  emotionsData: {
    likesCount?: number;
    dislikesCount?: number;
  };
  requesterContext: {
    isLiked?: boolean;
    isDisliked?: boolean;
  };
};

export type FeedCommentsData = {
  reactionPaging: {
    totalCount: number;
  };
  comments: FeedComment[];
};

export type FeedDiscussion = {
  id: string;
  post: FeedPost;
  commentsData: FeedCommentsData;
  emotionsData: {
    likesCount?: number;
    dislikesCount?: number;
  };
  requesterContext: {
    isLiked?: boolean;
    isDisliked?: boolean;
  };
  summary: {
    totalCommentsAndReplies: number;
    sharedCount: number;
  };
};

export type FeedPaging = {
  next: string;
  offSet: number;
  take: number;
  version: string;
};

export type FeedMetadata = {
  experimentName: string;
  streamType: string;
  designatedStreamType: string;
};

export type UserFeedResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: {
    discussions: FeedDiscussion[];
    paging: FeedPaging;
    metadata: FeedMetadata;
  };
};
