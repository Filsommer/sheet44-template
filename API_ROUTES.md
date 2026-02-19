# eToro API Routes

All routes are served under `/api/etoro/`. Authentication is handled via environment variables `ETORO_API_KEY` and `ETORO_USER_KEY` — no client-side auth headers needed. An optional `x-request-id` header can be passed for tracing.

---

## Market Data

### `GET /api/etoro/market/instruments`

Fetch metadata for instruments, optionally filtered.

| Param | Type | Required | Description |
|---|---|---|---|
| `instrumentIds` | string (comma-separated numbers) | No | Filter by instrument IDs |
| `exchangeIds` | string (comma-separated numbers) | No | Filter by exchange IDs |
| `stocksIndustryIds` | string (comma-separated numbers) | No | Filter by industry IDs |
| `instrumentTypeIds` | string (comma-separated numbers) | No | Filter by instrument type IDs |

---

### `GET /api/etoro/market/search`

Search for instruments by various criteria.

| Param | Type | Required | Description |
|---|---|---|---|
| `fields` | string | **Yes** | Fields to return in the response |
| `internalSymbolFull` | string | No | Filter by full internal symbol |
| `displayname` | string | No | Filter by display name |
| `popularityUniques7Day` | string | No | Filter by 7-day popularity |
| `searchText` | string | No | Free-text search query |
| `pageSize` | number | No | Results per page |
| `pageNumber` | number | No | Page number |
| `sort` | string | No | Sort criteria |

---

### `GET /api/etoro/market/rates`

Get live bid/ask rates for instruments.

| Param | Type | Required | Description |
|---|---|---|---|
| `instrumentIds` | string (comma-separated numbers) | **Yes** | Instrument IDs to get rates for |

---

### `GET /api/etoro/market/candles`

Get historical candlestick data for an instrument.

| Param | Type | Required | Description |
|---|---|---|---|
| `instrumentId` | number | **Yes** | The instrument ID |
| `direction` | `"asc"` \| `"desc"` | **Yes** | Sort direction of candles |
| `interval` | string | **Yes** | Time interval (e.g. `"OneDay"`, `"OneHour"`) |
| `candlesCount` | number | **Yes** | Number of candles to retrieve |

---

### `GET /api/etoro/market/closing-history`

Get closing price history for all instruments. No parameters.

---

### `GET /api/etoro/market/exchanges`

List stock exchanges, optionally filtered.

| Param | Type | Required | Description |
|---|---|---|---|
| `exchangeIds` | string (comma-separated numbers) | No | Filter by exchange IDs |

---

### `GET /api/etoro/market/instrument-types`

List all available instrument types. No parameters.

---

### `GET /api/etoro/market/industries`

List stock industries, optionally filtered.

| Param | Type | Required | Description |
|---|---|---|---|
| `stocksIndustryIds` | string (comma-separated numbers) | No | Filter by industry IDs |

---

## Trading — Portfolio & History

### `GET /api/etoro/trading/real/portfolio`

Get the user's real-money portfolio. No parameters.

### `GET /api/etoro/trading/demo/portfolio`

Get the user's demo (virtual) portfolio. No parameters.

### `GET /api/etoro/trading/real/pnl`

Get profit & loss summary for the real account. No parameters.

### `GET /api/etoro/trading/demo/pnl`

Get profit & loss summary for the demo account. No parameters.

### `GET /api/etoro/trading/history`

Get historical closed trades.

| Param | Type | Required | Description |
|---|---|---|---|
| `minDate` | string (date) | **Yes** | Start date filter (e.g. `"2025-01-01"`) |
| `page` | number | No | Page number |
| `pageSize` | number | No | Results per page |

---

## Trading — Order Execution

All execution routes exist in both `/real/` and `/demo/` variants. The demo variant operates on the virtual portfolio.

### `POST /api/etoro/trading/{real|demo}/open-by-amount`

Open a market order specifying a dollar amount.

**JSON Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `InstrumentID` | number | **Yes** | Instrument to trade |
| `IsBuy` | boolean | **Yes** | `true` for buy, `false` for sell |
| `Leverage` | number | **Yes** | Leverage multiplier |
| `Amount` | number | **Yes** | Dollar amount to invest |
| `StopLossRate` | number | No | Stop-loss price |
| `TakeProfitRate` | number | No | Take-profit price |
| `IsTslEnabled` | boolean | No | Enable trailing stop-loss |
| `IsNoStopLoss` | boolean | No | Disable stop-loss |
| `IsNoTakeProfit` | boolean | No | Disable take-profit |

---

### `POST /api/etoro/trading/{real|demo}/open-by-units`

Open a market order specifying a number of units.

**JSON Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `InstrumentID` | number | **Yes** | Instrument to trade |
| `IsBuy` | boolean | **Yes** | `true` for buy, `false` for sell |
| `Leverage` | number | **Yes** | Leverage multiplier |
| `AmountInUnits` | number | **Yes** | Number of units to trade |
| `StopLossRate` | number | No | Stop-loss price |
| `TakeProfitRate` | number | No | Take-profit price |
| `IsTslEnabled` | boolean | No | Enable trailing stop-loss |
| `IsNoStopLoss` | boolean | No | Disable stop-loss |
| `IsNoTakeProfit` | boolean | No | Disable take-profit |

---

### `DELETE /api/etoro/trading/{real|demo}/cancel-open-order`

Cancel a pending open order.

| Param | Type | Required | Description |
|---|---|---|---|
| `orderId` | string | **Yes** | The order ID to cancel |

---

### `POST /api/etoro/trading/{real|demo}/close-position`

Close an open position (fully or partially).

**JSON Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `positionId` | string | **Yes** | The position ID to close |
| `InstrumentId` | number | **Yes** | The instrument ID |
| `UnitsToDeduct` | number \| null | No | Units to deduct for partial close; omit for full close |

---

### `DELETE /api/etoro/trading/{real|demo}/cancel-close-order`

Cancel a pending close order.

| Param | Type | Required | Description |
|---|---|---|---|
| `orderId` | string | **Yes** | The close-order ID to cancel |

---

### `POST /api/etoro/trading/{real|demo}/limit-order`

Create a limit (pending) order at a specified price.

**JSON Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `InstrumentID` | number | **Yes** | Instrument to trade |
| `IsBuy` | boolean | **Yes** | `true` for buy, `false` for sell |
| `Leverage` | number | **Yes** | Leverage multiplier |
| `Rate` | number | **Yes** | Limit price at which to execute |
| `Amount` | number | No | Dollar amount (mutually exclusive with `AmountInUnits`) |
| `AmountInUnits` | number | No | Units amount (mutually exclusive with `Amount`) |
| `StopLossRate` | number | No | Stop-loss price |
| `TakeProfitRate` | number | No | Take-profit price |
| `IsTslEnabled` | boolean | No | Enable trailing stop-loss |
| `IsNoStopLoss` | boolean | No | Disable stop-loss |
| `IsNoTakeProfit` | boolean | No | Disable take-profit |

---

### `DELETE /api/etoro/trading/{real|demo}/delete-limit-order`

Delete an existing limit order.

| Param | Type | Required | Description |
|---|---|---|---|
| `orderId` | string | **Yes** | The limit-order ID to delete |

---

## Watchlists

### `GET /api/etoro/watchlists/list`

List all of the user's watchlists.

| Param | Type | Required | Description |
|---|---|---|---|
| `itemsPerPageForSingle` | number | No | Items per page when viewing a single watchlist |
| `ensureBuiltinWatchlists` | boolean | No | Include built-in watchlists |
| `addRelatedAssets` | boolean | No | Include related assets |

---

### `GET /api/etoro/watchlists/get`

Get a specific watchlist by ID.

| Param | Type | Required | Description |
|---|---|---|---|
| `watchlistId` | string | **Yes** | The watchlist ID |
| `pageNumber` | number | No | Page number |
| `itemsPerPage` | number | No | Items per page |

---

### `POST /api/etoro/watchlists/create`

Create a new watchlist.

| Param | Type | Required | Description |
|---|---|---|---|
| `name` | string | **Yes** | Watchlist name |
| `type` | string | No | Watchlist type |
| `dynamicQuery` | string | No | Dynamic query filter |

---

### `PUT /api/etoro/watchlists/rename`

Rename an existing watchlist.

| Param | Type | Required | Description |
|---|---|---|---|
| `watchlistId` | string | **Yes** | The watchlist ID |
| `newName` | string | **Yes** | New name for the watchlist |

---

### `DELETE /api/etoro/watchlists/delete`

Delete a watchlist.

| Param | Type | Required | Description |
|---|---|---|---|
| `watchlistId` | string | **Yes** | The watchlist ID to delete |

---

### `POST /api/etoro/watchlists/items/add`

Add items to a watchlist.

| Param | Type | Required | Description |
|---|---|---|---|
| `watchlistId` | string (query) | **Yes** | Target watchlist ID |

**JSON Body:** Array of items:

| Field | Type | Required | Description |
|---|---|---|---|
| `ItemId` | number | **Yes** | The instrument/user ID |
| `ItemType` | string | **Yes** | Type of item (e.g. `"Instrument"`) |
| `ItemRank` | number | No | Display rank |

---

### `PUT /api/etoro/watchlists/items/update`

Update items in a watchlist (e.g. reorder).

| Param | Type | Required | Description |
|---|---|---|---|
| `watchlistId` | string (query) | **Yes** | Target watchlist ID |

**JSON Body:** Array of `{ ItemId, ItemType, ItemRank? }` (same as add).

---

### `DELETE /api/etoro/watchlists/items/delete`

Remove items from a watchlist.

| Param | Type | Required | Description |
|---|---|---|---|
| `watchlistId` | string (query) | **Yes** | Target watchlist ID |

**JSON Body:** Array of `{ ItemId, ItemType, ItemRank? }` items to remove.

---

### `GET /api/etoro/watchlists/default-items`

Get items from the user's default watchlist.

| Param | Type | Required | Description |
|---|---|---|---|
| `itemsLimit` | number | No | Maximum items to return |
| `itemsPerPage` | number | No | Items per page |

---

### `POST /api/etoro/watchlists/default-selected`

Set selected items on the default watchlist.

**JSON Body:** Array of items to select.

---

### `POST /api/etoro/watchlists/new-default`

Create a new watchlist and set it as the default.

| Param | Type | Required | Description |
|---|---|---|---|
| `name` | string | **Yes** | Watchlist name |
| `type` | string | No | Watchlist type |
| `dynamicQuery` | string | No | Dynamic query filter |

---

### `PUT /api/etoro/watchlists/set-default`

Set an existing watchlist as the user's default.

| Param | Type | Required | Description |
|---|---|---|---|
| `watchlistId` | string | **Yes** | The watchlist ID to set as default |

---

### `PUT /api/etoro/watchlists/set-rank`

Change the display rank/order of a watchlist.

| Param | Type | Required | Description |
|---|---|---|---|
| `watchlistId` | string | **Yes** | The watchlist ID |
| `newRank` | number | **Yes** | New rank position |

---

### `GET /api/etoro/watchlists/public/list`

List another user's public watchlists.

| Param | Type | Required | Description |
|---|---|---|---|
| `userId` | string | **Yes** | The target user's ID |

---

### `GET /api/etoro/watchlists/public/get`

Get a specific public watchlist from another user.

| Param | Type | Required | Description |
|---|---|---|---|
| `userId` | string | **Yes** | The target user's ID |
| `watchlistId` | string | **Yes** | The watchlist ID |

---

## Feeds

### `GET /api/etoro/feeds/instrument`

Get the social feed for an instrument.

| Param | Type | Required | Description |
|---|---|---|---|
| `marketId` | string | **Yes** | The instrument/market ID |
| `requesterUserId` | string | No | Requesting user's ID |
| `take` | number | No | Number of posts to return |
| `offset` | number | No | Offset for pagination |
| `badgesExperimentIsEnabled` | boolean | No | Enable badges experiment |
| `reactionsPageSize` | number | No | Reactions per post |

---

### `GET /api/etoro/feeds/user`

Get the social feed for a specific user.

| Param | Type | Required | Description |
|---|---|---|---|
| `userId` | string | **Yes** | The user's ID |
| `requesterUserId` | string | No | Requesting user's ID |
| `take` | number | No | Number of posts to return |
| `offset` | number | No | Offset for pagination |
| `badgesExperimentIsEnabled` | boolean | No | Enable badges experiment |
| `reactionsPageSize` | number | No | Reactions per post |

---

### `POST /api/etoro/feeds/post`

Create a new social feed post.

**JSON Body:** Free-form post object (content, mentions, etc.).

---

## Discovery

### `GET /api/etoro/discovery/copiers`

Get the popular investor copiers leaderboard. No parameters.

---

### `GET /api/etoro/discovery/recommendations`

Get market/instrument recommendations.

| Param | Type | Required | Description |
|---|---|---|---|
| `itemsCount` | number | **Yes** | Number of recommendations to return |

---

### `GET /api/etoro/discovery/curated-lists`

Get eToro curated instrument lists. No parameters.

---

## Users

### `GET /api/etoro/users/people`

Look up user profiles by username or customer ID.

| Param | Type | Required | Description |
|---|---|---|---|
| `usernames` | string | No | Comma-separated usernames |
| `cidList` | string | No | Comma-separated customer IDs |

---

### `GET /api/etoro/users/search`

Search for people/investors with filters.

| Param | Type | Required | Description |
|---|---|---|---|
| `period` | string | **Yes** | Time period for stats (e.g. `"OneYearAgo"`) |
| `page` | number | No | Page number |
| `pageSize` | number | No | Results per page |
| `sort` | string | No | Sort criteria |
| `popularInvestor` | boolean | No | Filter to popular investors only |
| `gainMax` | number | No | Maximum gain filter |
| `countryId` | number | No | Filter by country ID |
| `instrumentId` | number | No | Filter by traded instrument |
| `isTestAccount` | boolean | No | Include/exclude test accounts |

---

### `GET /api/etoro/users/gain`

Get a user's overall gain/performance stats.

| Param | Type | Required | Description |
|---|---|---|---|
| `username` | string | **Yes** | The eToro username |

---

### `GET /api/etoro/users/daily-gain`

Get a user's daily gain over a date range.

| Param | Type | Required | Description |
|---|---|---|---|
| `username` | string | **Yes** | The eToro username |
| `minDate` | string (date) | **Yes** | Start date |
| `maxDate` | string (date) | **Yes** | End date |
| `type` | string | **Yes** | Gain type |

---

### `GET /api/etoro/users/portfolio`

Get a user's live public portfolio.

| Param | Type | Required | Description |
|---|---|---|---|
| `username` | string | **Yes** | The eToro username |

---

### `GET /api/etoro/users/trade-info`

Get a user's trade information for a period.

| Param | Type | Required | Description |
|---|---|---|---|
| `username` | string | **Yes** | The eToro username |
| `period` | string | **Yes** | Time period (e.g. `"OneYearAgo"`) |
