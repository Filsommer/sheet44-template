export type EtoroApiErrorResponse = { error: string };

export type FeedPagination = {
  total: number;
  hasMore: boolean;
};

export type FeedPostSummary = {
  id: string;
  created: string;
  updated?: string;
  type?: string;
  owner?: {
    id: string;
    username?: string;
  };
  message?: {
    text: string;
    languageCode?: string;
  };
};

export type InstrumentFeedResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: {
    posts: FeedPostSummary[];
    pagination: FeedPagination;
  };
};
