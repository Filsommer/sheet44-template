export type EtoroApiErrorResponse = { error: string };

export type EtoroApiResponse<TData> = {
  ok: boolean;
  status: number;
  statusText: string;
  data: TData;
};

export type MarketRate = {
  instrumentID: number;
  ask?: number;
  bid?: number;
  lastExecution?: number;
  conversionRateAsk?: number;
  conversionRateBid?: number;
  date?: string;
  priceRateID?: number;
  [key: string]: unknown;
};

export type MarketRatesData = {
  rates: MarketRate[];
};

export type MarketSearchItem = {
  instrumentId: number;
  displayname?: string;
  [key: string]: unknown;
};

export type MarketSearchData = {
  page: number;
  pageSize: number;
  totalItems: number;
  items: MarketSearchItem[];
};

export type MarketInstrumentDisplayData = {
  instrumentId: number;
  instrumentDisplayName?: string;
  instrumentTypeId?: number;
  exchangeId?: number;
  symbolFull?: string;
  stocksIndustryId?: number;
  [key: string]: unknown;
};

export type MarketInstrumentsData = {
  instrumentDisplayDatas: MarketInstrumentDisplayData[];
};

export type MarketExchangeInfo = {
  exchangeId: number;
  exchangeDescription?: string;
  [key: string]: unknown;
};

export type MarketExchangesData = {
  exchangeInfo: MarketExchangeInfo[];
};

export type MarketInstrumentTypeInfo = {
  instrumentTypeId: number;
  instrumentTypeDescription?: string;
  [key: string]: unknown;
};

export type MarketInstrumentTypesData = {
  instrumentTypes: MarketInstrumentTypeInfo[];
};

export type MarketStocksIndustry = {
  industryId: number;
  industryName?: string;
  [key: string]: unknown;
};

export type MarketIndustriesData = {
  StocksIndustries: MarketStocksIndustry[];
};

export type ClosingPriceValue = {
  price?: number;
  date?: string;
};

export type ClosingPrices = {
  daily?: ClosingPriceValue;
  weekly?: ClosingPriceValue;
  monthly?: ClosingPriceValue;
};

export type ClosingHistoryItem = {
  instrumentId: number;
  officialClosingPrice?: number;
  isMarketOpen?: boolean;
  closingPrices?: ClosingPrices;
  [key: string]: unknown;
};

export type CandlePoint = {
  instrumentID?: number;
  fromDate?: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
  [key: string]: unknown;
};

export type InstrumentCandles = {
  instrumentId?: number;
  candles?: CandlePoint[];
  rangeOpen?: number;
  rangeClose?: number;
  rangeHigh?: number;
  rangeLow?: number;
  volume?: number;
  [key: string]: unknown;
};

export type MarketCandlesData = {
  interval?: string;
  candles: InstrumentCandles[];
};

export type TradingOrderForOpen = {
  instrumentID?: number;
  amount?: number;
  amountInUnits?: number;
  isBuy?: boolean;
  leverage?: number;
  stopLossRate?: number;
  takeProfitRate?: number;
  isTslEnabled?: boolean;
  mirrorID?: number;
  totalExternalCosts?: number;
  lotCount?: number;
  orderID?: number;
  orderType?: string;
  statusID?: number;
  CID?: number;
  openDateTime?: string;
  lastUpdate?: string;
  [key: string]: unknown;
};

export type TradingOpenOrderData = {
  orderForOpen?: TradingOrderForOpen;
  token?: string;
};

export type TradingOrderForClose = {
  positionID?: number;
  instrumentID?: number;
  unitsToDeduct?: number;
  orderID?: number;
  orderType?: string;
  statusID?: number;
  CID?: number;
  openDateTime?: string;
  lastUpdate?: string;
  [key: string]: unknown;
};

export type TradingCloseOrderData = {
  orderForClose?: TradingOrderForClose;
  token?: string;
};

export type TradingTokenData = {
  token: string;
};

export type TradingClientPortfolio = {
  positions?: unknown[];
  pendingOrders?: unknown[];
  [key: string]: unknown;
};

export type TradingPortfolioData = {
  clientPortfolio: TradingClientPortfolio;
};

export type TradingHistoryItem = {
  netProfit?: number;
  closeRate?: number;
  closeTimestamp?: string;
  positionId?: number;
  instrumentId?: number;
  isBuy?: boolean;
  leverage?: number;
  openRate?: number;
  openTimestamp?: string;
  stopLossRate?: number;
  takeProfitRate?: number;
  trailingStopLoss?: boolean;
  orderId?: number;
  socialTradeId?: number;
  parentPositionId?: number;
  investment?: number;
  initialInvestment?: number;
  fees?: number;
  units?: number;
  [key: string]: unknown;
};

export type UserProfile = {
  gcid?: number;
  realCID?: number;
  demoCID?: number;
  username?: string;
  [key: string]: unknown;
};

export type UsersPeopleData = {
  users?: UserProfile[];
  Users?: UserProfile[];
};

export type UsersSearchItem = {
  customerId?: number;
  userName?: string;
  fullName?: string;
  [key: string]: unknown;
};

export type UsersSearchData = {
  status: string;
  totalRows: number;
  items: UsersSearchItem[];
};

export type GainEntry = {
  timestamp?: string;
  gain?: number;
};

export type UsersGainData = {
  monthly?: GainEntry[];
  yearly?: GainEntry[];
};

export type UsersDailyGainData = GainEntry[] | { gain?: number };

export type UsersTradeInfoData = {
  userName?: string;
  fullName?: string;
  weeksSinceRegistration?: number;
  countryId?: number;
  gain?: number;
  dailyGain?: number;
  [key: string]: unknown;
};

export type UsersPortfolioLiveData = {
  realizedCreditPct?: number;
  unrealizedCreditPct?: number;
  positions?: unknown[];
  socialTrades?: unknown[];
  [key: string]: unknown;
};

export type DiscoveryCopier = {
  Gender?: string;
  Club?: string;
  Country?: string;
  CopyStartedAtCategory?: string;
  AmountCategory?: string;
  AgeCategory?: string;
  CopyRealizedEquity_pnl?: string;
  AvailableCopyBalance?: string;
  [key: string]: unknown;
};

export type DiscoveryCopiersData = {
  copiers?: DiscoveryCopier[];
};

export type WatchlistItem = {
  ItemId: number;
  ItemType: string;
  ItemRank?: number;
  [key: string]: unknown;
};

export type WatchlistResponse = {
  WatchlistId: string;
  Name: string;
  Gcid: number;
  WatchlistType: string;
  TotalItems: number;
  IsDefault: boolean;
  IsUserSelectedDefault: boolean;
  WatchlistRank: number;
  DynamicUrl: string;
  Items: WatchlistItem[];
  RelatedAssets: unknown[];
  [key: string]: unknown;
};
