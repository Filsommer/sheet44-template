const BASE_URL = "https://public-api.etoro.com/api/v1";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type EtoroCredentials = {
  apiKey: string;
  userKey: string;
  requestId?: string;
};

export type EtoroResponse<T = unknown> = {
  ok: boolean;
  status: number;
  statusText: string;
  data: T;
};

// Market Data

export type SearchInstrumentsParams = {
  fields: string;
  internalSymbolFull?: string;
  displayname?: string;
  popularityUniques7Day?: string;
  searchText?: string;
  pageSize?: number;
  pageNumber?: number;
  sort?: string;
};

export type InstrumentsMetadataParams = {
  instrumentIds?: number[];
  exchangeIds?: number[];
  stocksIndustryIds?: number[];
  instrumentTypeIds?: number[];
};

export type CandlesParams = {
  instrumentId: number;
  direction: "asc" | "desc";
  interval: string;
  candlesCount: number;
};

// Trading Execution

export type MarketOpenByAmountParams = {
  InstrumentID: number;
  IsBuy: boolean;
  Leverage: number;
  Amount: number;
  StopLossRate?: number;
  TakeProfitRate?: number;
  IsTslEnabled?: boolean;
  IsNoStopLoss?: boolean;
  IsNoTakeProfit?: boolean;
};

export type MarketOpenByUnitsParams = {
  InstrumentID: number;
  IsBuy: boolean;
  Leverage: number;
  AmountInUnits: number;
  StopLossRate?: number;
  TakeProfitRate?: number;
  IsTslEnabled?: boolean;
  IsNoStopLoss?: boolean;
  IsNoTakeProfit?: boolean;
};

export type ClosePositionParams = {
  positionId: string;
  InstrumentId: number;
  UnitsToDeduct?: number | null;
};

export type LimitOrderParams = {
  InstrumentID: number;
  IsBuy: boolean;
  Leverage: number;
  Rate: number;
  Amount?: number;
  AmountInUnits?: number;
  StopLossRate?: number;
  TakeProfitRate?: number;
  IsTslEnabled?: boolean;
  IsNoStopLoss?: boolean;
  IsNoTakeProfit?: boolean;
};

export type TradeHistoryParams = {
  minDate: string;
  page?: number;
  pageSize?: number;
};

// Watchlists

export type ListWatchlistsParams = {
  itemsPerPageForSingle?: number;
  ensureBuiltinWatchlists?: boolean;
  addRelatedAssets?: boolean;
};

export type GetWatchlistParams = {
  watchlistId: string;
  pageNumber?: number;
  itemsPerPage?: number;
};

export type CreateWatchlistParams = {
  name: string;
  type?: string;
  dynamicQuery?: string;
};

export type WatchlistItemDto = {
  ItemId: number;
  ItemType: string;
  ItemRank?: number;
};

// Feeds

export type FeedParams = {
  requesterUserId?: string;
  take?: number;
  offset?: number;
  badgesExperimentIsEnabled?: boolean;
  reactionsPageSize?: number;
};

// User Info

export type PeopleParams = {
  usernames?: string;
  cidList?: string;
};

export type SearchPeopleParams = {
  period: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  popularInvestor?: boolean;
  gainMax?: number;
  countryId?: number;
  instrumentId?: number;
  isTestAccount?: boolean;
};

export type DailyGainParams = {
  minDate: string;
  maxDate: string;
  type: string;
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

type QueryValue = string | number | boolean | undefined | (string | number)[];

function buildQueryString(params: Record<string, QueryValue>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;

    let encoded: string;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      encoded = value.map((v) => encodeURIComponent(String(v))).join(",");
    } else {
      const str = String(value);
      if (str === "") continue;
      encoded = str
        .split(",")
        .map((s) => encodeURIComponent(s))
        .join(",");
    }

    parts.push(`${encodeURIComponent(key)}=${encoded}`);
  }
  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

async function callEtoro<T = unknown>(
  credentials: EtoroCredentials,
  method: string,
  path: string,
  options?: { query?: Record<string, QueryValue>; body?: unknown },
): Promise<EtoroResponse<T>> {
  const qs = options?.query ? buildQueryString(options.query) : "";
  const url = `${BASE_URL}${path}${qs}`;
  const hasBody = options?.body !== undefined;

  const headers: Record<string, string> = {
    "x-api-key": credentials.apiKey,
    "x-user-key": credentials.userKey,
    "x-request-id": credentials.requestId ?? crypto.randomUUID(),
  };

  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  console.log(url);

  const response = await fetch(url, {
    method,
    headers,
    body: hasBody ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  const text = await response.text();
  let data: T;
  try {
    data = JSON.parse(text) as T;
  } catch {
    data = text as unknown as T;
  }

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    data,
  };
}

// ---------------------------------------------------------------------------
// Credential extraction (for use inside API routes)
// ---------------------------------------------------------------------------

export function extractCredentials(request: Request): EtoroCredentials {
  const apiKey = process.env.ETORO_API_KEY;
  const userKey = process.env.ETORO_USER_KEY;
  const requestId = request.headers.get("x-request-id") ?? undefined;

  if (!apiKey || !userKey) {
    throw new Error("Missing ETORO_API_KEY or ETORO_USER_KEY environment variables.");
  }

  return { apiKey, userKey, requestId };
}

// ---------------------------------------------------------------------------
// Market Data
// ---------------------------------------------------------------------------

export async function searchInstruments(
  credentials: EtoroCredentials,
  params: SearchInstrumentsParams,
) {
  return callEtoro(credentials, "GET", "/market-data/search", {
    query: {
      fields: params.fields,
      internalSymbolFull: params.internalSymbolFull,
      displayname: params.displayname,
      searchText: params.searchText,
      pageSize: params.pageSize,
      pageNumber: params.pageNumber,
      sort: params.sort,
    },
  });
}

export async function getInstrumentsMetadata(
  credentials: EtoroCredentials,
  params?: InstrumentsMetadataParams,
) {
  return callEtoro(credentials, "GET", "/market-data/instruments", {
    query: {
      instrumentIds: params?.instrumentIds,
      exchangeIds: params?.exchangeIds,
      stocksIndustryIds: params?.stocksIndustryIds,
      instrumentTypeIds: params?.instrumentTypeIds,
    },
  });
}

export async function getLiveRates(credentials: EtoroCredentials, instrumentIds: number[]) {
  return callEtoro(credentials, "GET", "/market-data/instruments/rates", {
    query: { instrumentIds },
  });
}

export async function getClosingPriceHistory(credentials: EtoroCredentials) {
  return callEtoro(credentials, "GET", "/market-data/instruments/history/closing-price");
}

export async function getCandles(credentials: EtoroCredentials, params: CandlesParams) {
  const path = `/market-data/instruments/${params.instrumentId}/history/candles/${params.direction}/${params.interval}/${params.candlesCount}`;
  return callEtoro(credentials, "GET", path);
}

export async function getExchanges(credentials: EtoroCredentials, exchangeIds?: number[]) {
  return callEtoro(credentials, "GET", "/market-data/exchanges", {
    query: { exchangeIds },
  });
}

export async function getInstrumentTypes(credentials: EtoroCredentials) {
  return callEtoro(credentials, "GET", "/market-data/instrument-types");
}

export async function getIndustries(credentials: EtoroCredentials, stocksIndustryIds?: number[]) {
  return callEtoro(credentials, "GET", "/market-data/stocks-industries", {
    query: { stocksIndustryIds },
  });
}

// ---------------------------------------------------------------------------
// Trading Execution
// ---------------------------------------------------------------------------

export async function openMarketOrderByAmount(
  credentials: EtoroCredentials,
  params: MarketOpenByAmountParams,
  demo = false,
) {
  const prefix = demo ? "/trading/execution/demo" : "/trading/execution";
  return callEtoro(credentials, "POST", `${prefix}/market-open-orders/by-amount`, {
    body: params,
  });
}

export async function openMarketOrderByUnits(
  credentials: EtoroCredentials,
  params: MarketOpenByUnitsParams,
  demo = false,
) {
  const prefix = demo ? "/trading/execution/demo" : "/trading/execution";
  return callEtoro(credentials, "POST", `${prefix}/market-open-orders/by-units`, {
    body: params,
  });
}

export async function cancelOpenOrder(
  credentials: EtoroCredentials,
  orderId: string,
  demo = false,
) {
  const prefix = demo ? "/trading/execution/demo" : "/trading/execution";
  return callEtoro(
    credentials,
    "DELETE",
    `${prefix}/market-open-orders/${encodeURIComponent(orderId)}`,
  );
}

export async function closePosition(
  credentials: EtoroCredentials,
  params: ClosePositionParams,
  demo = false,
) {
  const prefix = demo ? "/trading/execution/demo" : "/trading/execution";
  const { positionId, ...body } = params;
  return callEtoro(
    credentials,
    "POST",
    `${prefix}/market-close-orders/positions/${encodeURIComponent(positionId)}`,
    { body },
  );
}

export async function cancelCloseOrder(
  credentials: EtoroCredentials,
  orderId: string,
  demo = false,
) {
  const prefix = demo ? "/trading/execution/demo" : "/trading/execution";
  return callEtoro(
    credentials,
    "DELETE",
    `${prefix}/market-close-orders/${encodeURIComponent(orderId)}`,
  );
}

export async function createLimitOrder(
  credentials: EtoroCredentials,
  params: LimitOrderParams,
  demo = false,
) {
  const prefix = demo ? "/trading/execution/demo" : "/trading/execution";
  return callEtoro(credentials, "POST", `${prefix}/limit-orders`, {
    body: params,
  });
}

export async function deleteLimitOrder(
  credentials: EtoroCredentials,
  orderId: string,
  demo = false,
) {
  const prefix = demo ? "/trading/execution/demo" : "/trading/execution";
  return callEtoro(credentials, "DELETE", `${prefix}/limit-orders/${encodeURIComponent(orderId)}`);
}

// ---------------------------------------------------------------------------
// Trading Info
// ---------------------------------------------------------------------------

export async function getPnl(credentials: EtoroCredentials, demo = false) {
  const path = demo ? "/trading/info/demo/pnl" : "/trading/info/real/pnl";
  return callEtoro(credentials, "GET", path);
}

export async function getPortfolio(credentials: EtoroCredentials, demo = false) {
  const path = demo ? "/trading/info/demo/portfolio" : "/trading/info/portfolio";
  return callEtoro(credentials, "GET", path);
}

export async function getTradeHistory(credentials: EtoroCredentials, params: TradeHistoryParams) {
  return callEtoro(credentials, "GET", "/trading/info/trade/history", {
    query: {
      minDate: params.minDate,
      page: params.page,
      pageSize: params.pageSize,
    },
  });
}

// ---------------------------------------------------------------------------
// Watchlists
// ---------------------------------------------------------------------------

export async function listWatchlists(credentials: EtoroCredentials, params?: ListWatchlistsParams) {
  return callEtoro(credentials, "GET", "/watchlists", {
    query: {
      itemsPerPageForSingle: params?.itemsPerPageForSingle,
      ensureBuiltinWatchlists: params?.ensureBuiltinWatchlists,
      addRelatedAssets: params?.addRelatedAssets,
    },
  });
}

export async function getWatchlist(credentials: EtoroCredentials, params: GetWatchlistParams) {
  return callEtoro(credentials, "GET", `/watchlists/${encodeURIComponent(params.watchlistId)}`, {
    query: {
      pageNumber: params.pageNumber,
      itemsPerPage: params.itemsPerPage,
    },
  });
}

export async function createWatchlist(
  credentials: EtoroCredentials,
  params: CreateWatchlistParams,
) {
  return callEtoro(credentials, "POST", "/watchlists", {
    query: {
      name: params.name,
      type: params.type,
      dynamicQuery: params.dynamicQuery,
    },
  });
}

export async function renameWatchlist(
  credentials: EtoroCredentials,
  watchlistId: string,
  newName: string,
) {
  return callEtoro(credentials, "PUT", `/watchlists/${encodeURIComponent(watchlistId)}`, {
    query: { newName },
  });
}

export async function deleteWatchlist(credentials: EtoroCredentials, watchlistId: string) {
  return callEtoro(credentials, "DELETE", `/watchlists/${encodeURIComponent(watchlistId)}`);
}

export async function addWatchlistItems(
  credentials: EtoroCredentials,
  watchlistId: string,
  items: WatchlistItemDto[],
) {
  return callEtoro(credentials, "POST", `/watchlists/${encodeURIComponent(watchlistId)}/items`, {
    body: items,
  });
}

export async function updateWatchlistItems(
  credentials: EtoroCredentials,
  watchlistId: string,
  items: WatchlistItemDto[],
) {
  return callEtoro(credentials, "PUT", `/watchlists/${encodeURIComponent(watchlistId)}/items`, {
    body: items,
  });
}

export async function deleteWatchlistItems(
  credentials: EtoroCredentials,
  watchlistId: string,
  items: WatchlistItemDto[],
) {
  return callEtoro(credentials, "DELETE", `/watchlists/${encodeURIComponent(watchlistId)}/items`, {
    body: items,
  });
}

export async function setDefaultSelectedItems(credentials: EtoroCredentials, items: unknown[]) {
  return callEtoro(credentials, "POST", "/watchlists/default-watchlist/selected-items", {
    body: items,
  });
}

export async function getDefaultWatchlistItems(
  credentials: EtoroCredentials,
  params?: { itemsLimit?: number; itemsPerPage?: number },
) {
  return callEtoro(credentials, "GET", "/watchlists/default-watchlists/items", {
    query: {
      itemsLimit: params?.itemsLimit,
      itemsPerPage: params?.itemsPerPage,
    },
  });
}

export async function createNewAsDefaultWatchlist(
  credentials: EtoroCredentials,
  params: CreateWatchlistParams,
) {
  return callEtoro(credentials, "POST", "/watchlists/newasdefault-watchlist", {
    query: {
      name: params.name,
      type: params.type,
      dynamicQuery: params.dynamicQuery,
    },
  });
}

export async function setUserDefaultWatchlist(credentials: EtoroCredentials, watchlistId: string) {
  return callEtoro(
    credentials,
    "PUT",
    `/watchlists/setUserSelectedUserDefault/${encodeURIComponent(watchlistId)}`,
  );
}

export async function setWatchlistRank(
  credentials: EtoroCredentials,
  watchlistId: string,
  newRank: number,
) {
  return callEtoro(credentials, "PUT", `/watchlists/rank/${encodeURIComponent(watchlistId)}`, {
    query: { newRank },
  });
}

export async function getPublicWatchlists(credentials: EtoroCredentials, userId: string) {
  return callEtoro(credentials, "GET", `/watchlists/public/${encodeURIComponent(userId)}`);
}

export async function getPublicWatchlist(
  credentials: EtoroCredentials,
  userId: string,
  watchlistId: string,
) {
  return callEtoro(
    credentials,
    "GET",
    `/watchlists/public/${encodeURIComponent(userId)}/${encodeURIComponent(watchlistId)}`,
  );
}

// ---------------------------------------------------------------------------
// Feeds
// ---------------------------------------------------------------------------

export async function getInstrumentFeed(
  credentials: EtoroCredentials,
  marketId: string,
  params?: FeedParams,
) {
  return callEtoro(credentials, "GET", `/feeds/instrument/${encodeURIComponent(marketId)}`, {
    query: {
      requesterUserId: params?.requesterUserId,
      take: params?.take,
      offset: params?.offset,
      badgesExperimentIsEnabled: params?.badgesExperimentIsEnabled,
      reactionsPageSize: params?.reactionsPageSize,
    },
  });
}

export async function getUserFeed(
  credentials: EtoroCredentials,
  userId: string,
  params?: FeedParams,
) {
  return callEtoro(credentials, "GET", `/feeds/user/${encodeURIComponent(userId)}`, {
    query: {
      requesterUserId: params?.requesterUserId,
      take: params?.take,
      offset: params?.offset,
      badgesExperimentIsEnabled: params?.badgesExperimentIsEnabled,
      reactionsPageSize: params?.reactionsPageSize,
    },
  });
}

export async function createFeedPost(credentials: EtoroCredentials, body: unknown) {
  return callEtoro(credentials, "POST", "/feeds/post", { body });
}

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------

export async function getCuratedLists(credentials: EtoroCredentials) {
  return callEtoro(credentials, "GET", "/curated-lists");
}

export async function getMarketRecommendations(credentials: EtoroCredentials, itemsCount: number) {
  return callEtoro(credentials, "GET", `/market-recommendations/${itemsCount}`);
}

export async function getPopularInvestorCopiers(credentials: EtoroCredentials) {
  return callEtoro(credentials, "GET", "/pi-data/copiers");
}

// ---------------------------------------------------------------------------
// User Info
// ---------------------------------------------------------------------------

export async function getPeople(credentials: EtoroCredentials, params?: PeopleParams) {
  return callEtoro(credentials, "GET", "/user-info/people", {
    query: {
      usernames: params?.usernames,
      cidList: params?.cidList,
    },
  });
}

export async function searchPeople(credentials: EtoroCredentials, params: SearchPeopleParams) {
  return callEtoro(credentials, "GET", "/user-info/people/search", {
    query: {
      period: params.period,
      page: params.page,
      pageSize: params.pageSize,
      sort: params.sort,
      popularInvestor: params.popularInvestor,
      gainMax: params.gainMax,
      countryId: params.countryId,
      instrumentId: params.instrumentId,
      isTestAccount: params.isTestAccount,
    },
  });
}

export async function getUserGain(credentials: EtoroCredentials, username: string) {
  return callEtoro(credentials, "GET", `/user-info/people/${encodeURIComponent(username)}/gain`);
}

export async function getUserDailyGain(
  credentials: EtoroCredentials,
  username: string,
  params: DailyGainParams,
) {
  return callEtoro(
    credentials,
    "GET",
    `/user-info/people/${encodeURIComponent(username)}/daily-gain`,
    {
      query: {
        minDate: params.minDate,
        maxDate: params.maxDate,
        type: params.type,
      },
    },
  );
}

export async function getUserPortfolioLive(credentials: EtoroCredentials, username: string) {
  return callEtoro(
    credentials,
    "GET",
    `/user-info/people/${encodeURIComponent(username)}/portfolio/live`,
  );
}

export async function getUserTradeInfo(
  credentials: EtoroCredentials,
  username: string,
  period: string,
) {
  return callEtoro(
    credentials,
    "GET",
    `/user-info/people/${encodeURIComponent(username)}/tradeinfo`,
    { query: { period } },
  );
}
