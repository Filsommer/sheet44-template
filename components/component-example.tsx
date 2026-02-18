"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const BASE_URL = "https://public-api.etoro.com/api/v1";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type FieldType = "text" | "number" | "boolean" | "textarea";
type FieldLocation = "path" | "query" | "body";

type EndpointField = {
  key: string;
  label: string;
  location: FieldLocation;
  type?: FieldType;
  required?: boolean;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  allowNullLiteral?: boolean;
};

type Endpoint = {
  id: string;
  category: string;
  title: string;
  method: HttpMethod;
  path: string;
  description: string;
  fields: EndpointField[];
  oneOfBodyFields?: string[];
};

type ApiResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  payload: unknown;
};

const endpoints: Endpoint[] = [
  {
    id: "market-search",
    category: "Market Data",
    title: "Search Instruments",
    method: "GET",
    path: "/market-data/search",
    description: "Lookup instruments by ticker/symbol and choose returned fields.",
    fields: [
      {
        key: "internalSymbolFull",
        label: "Ticker / internalSymbolFull",
        location: "query",
        placeholder: "BTC",
      },
      {
        key: "popularityUniques7Day",
        label: "Display Name",
        location: "query",
        placeholder: "Amazon",
      },
      {
        key: "fields",
        label: "Fields",
        location: "query",
        required: true,
        defaultValue: "instrumentId,internalSymbolFull,displayname,marketId",
      },
      { key: "searchText", label: "Search Text", location: "query" },
      { key: "pageSize", label: "Page Size", location: "query", type: "number" },
      { key: "pageNumber", label: "Page Number", location: "query", type: "number" },
      { key: "sort", label: "Sort", location: "query", placeholder: "displayname:asc" },
    ],
  },
  {
    id: "market-instruments",
    category: "Market Data",
    title: "Instruments Metadata",
    method: "GET",
    path: "/market-data/instruments",
    description: "Fetch metadata for instrument/exchange/industry/type filters.",
    fields: [
      { key: "instrumentIds", label: "Instrument IDs (comma-separated)", location: "query" },
      { key: "exchangeIds", label: "Exchange IDs (comma-separated)", location: "query" },
      { key: "stocksIndustryIds", label: "Industry IDs (comma-separated)", location: "query" },
      {
        key: "instrumentTypeIds",
        label: "Instrument Type IDs (comma-separated)",
        location: "query",
      },
    ],
  },
  {
    id: "market-rates",
    category: "Market Data",
    title: "Live Rates",
    method: "GET",
    path: "/market-data/instruments/rates",
    description: "Get rates for one or more instruments.",
    fields: [
      {
        key: "instrumentIds",
        label: "Instrument IDs (comma-separated)",
        location: "query",
        required: true,
        placeholder: "1001,1002",
      },
    ],
  },
  {
    id: "market-closing-history",
    category: "Market Data",
    title: "Bulk Closing Price History",
    method: "GET",
    path: "/market-data/instruments/history/closing-price",
    description: "Returns closing prices history for all instruments.",
    fields: [],
  },
  {
    id: "market-candles",
    category: "Market Data",
    title: "Instrument Candles",
    method: "GET",
    path: "/market-data/instruments/{instrumentId}/history/candles/{direction}/{interval}/{candlesCount}",
    description: "Get last X candles for an instrument and interval.",
    fields: [
      {
        key: "instrumentId",
        label: "Instrument ID",
        location: "path",
        required: true,
        type: "number",
        placeholder: "100000",
      },
      {
        key: "direction",
        label: "Direction",
        location: "path",
        required: true,
        defaultValue: "desc",
        placeholder: "asc or desc",
      },
      {
        key: "interval",
        label: "Interval",
        location: "path",
        required: true,
        defaultValue: "OneDay",
      },
      {
        key: "candlesCount",
        label: "Last Candles",
        location: "path",
        required: true,
        type: "number",
        defaultValue: "50",
      },
    ],
  },
  {
    id: "market-exchanges",
    category: "Market Data",
    title: "Exchanges",
    method: "GET",
    path: "/market-data/exchanges",
    description: "List exchanges.",
    fields: [{ key: "exchangeIds", label: "Exchange IDs", location: "query" }],
  },
  {
    id: "market-instrument-types",
    category: "Market Data",
    title: "Instrument Types",
    method: "GET",
    path: "/market-data/instrument-types",
    description: "List instrument types.",
    fields: [],
  },
  {
    id: "market-industries",
    category: "Market Data",
    title: "Stock Industries",
    method: "GET",
    path: "/market-data/stocks-industries",
    description: "List industries.",
    fields: [{ key: "stocksIndustryIds", label: "Industry IDs", location: "query" }],
  },
  {
    id: "exec-demo-open-by-amount",
    category: "Trading Execution",
    title: "Demo Market Open (By Amount)",
    method: "POST",
    path: "/trading/execution/demo/market-open-orders/by-amount",
    description: "Open a demo position using amount.",
    fields: [
      {
        key: "InstrumentID",
        label: "InstrumentID",
        location: "body",
        required: true,
        type: "number",
      },
      {
        key: "IsBuy",
        label: "IsBuy",
        location: "body",
        required: true,
        type: "boolean",
        defaultValue: "true",
      },
      {
        key: "Leverage",
        label: "Leverage",
        location: "body",
        required: true,
        type: "number",
        defaultValue: "1",
      },
      {
        key: "Amount",
        label: "Amount",
        location: "body",
        required: true,
        type: "number",
        defaultValue: "100",
      },
      { key: "StopLossRate", label: "StopLossRate", location: "body", type: "number" },
      { key: "TakeProfitRate", label: "TakeProfitRate", location: "body", type: "number" },
      { key: "IsTslEnabled", label: "IsTslEnabled", location: "body", type: "boolean" },
      { key: "IsNoStopLoss", label: "IsNoStopLoss", location: "body", type: "boolean" },
      { key: "IsNoTakeProfit", label: "IsNoTakeProfit", location: "body", type: "boolean" },
    ],
  },
  {
    id: "exec-real-open-by-amount",
    category: "Trading Execution",
    title: "Real Market Open (By Amount)",
    method: "POST",
    path: "/trading/execution/market-open-orders/by-amount",
    description: "Open a real position using amount.",
    fields: [
      {
        key: "InstrumentID",
        label: "InstrumentID",
        location: "body",
        required: true,
        type: "number",
      },
      {
        key: "IsBuy",
        label: "IsBuy",
        location: "body",
        required: true,
        type: "boolean",
        defaultValue: "true",
      },
      {
        key: "Leverage",
        label: "Leverage",
        location: "body",
        required: true,
        type: "number",
        defaultValue: "1",
      },
      {
        key: "Amount",
        label: "Amount",
        location: "body",
        required: true,
        type: "number",
        defaultValue: "100",
      },
      { key: "StopLossRate", label: "StopLossRate", location: "body", type: "number" },
      { key: "TakeProfitRate", label: "TakeProfitRate", location: "body", type: "number" },
      { key: "IsTslEnabled", label: "IsTslEnabled", location: "body", type: "boolean" },
      { key: "IsNoStopLoss", label: "IsNoStopLoss", location: "body", type: "boolean" },
      { key: "IsNoTakeProfit", label: "IsNoTakeProfit", location: "body", type: "boolean" },
    ],
  },
  {
    id: "exec-demo-open-by-units",
    category: "Trading Execution",
    title: "Demo Market Open (By Units)",
    method: "POST",
    path: "/trading/execution/demo/market-open-orders/by-units",
    description: "Open a demo position using amount in units.",
    fields: [
      {
        key: "InstrumentID",
        label: "InstrumentID",
        location: "body",
        required: true,
        type: "number",
      },
      {
        key: "IsBuy",
        label: "IsBuy",
        location: "body",
        required: true,
        type: "boolean",
        defaultValue: "true",
      },
      {
        key: "Leverage",
        label: "Leverage",
        location: "body",
        required: true,
        type: "number",
        defaultValue: "1",
      },
      {
        key: "AmountInUnits",
        label: "AmountInUnits",
        location: "body",
        required: true,
        type: "number",
      },
      { key: "StopLossRate", label: "StopLossRate", location: "body", type: "number" },
      { key: "TakeProfitRate", label: "TakeProfitRate", location: "body", type: "number" },
      { key: "IsTslEnabled", label: "IsTslEnabled", location: "body", type: "boolean" },
      { key: "IsNoStopLoss", label: "IsNoStopLoss", location: "body", type: "boolean" },
      { key: "IsNoTakeProfit", label: "IsNoTakeProfit", location: "body", type: "boolean" },
    ],
  },
  {
    id: "exec-real-open-by-units",
    category: "Trading Execution",
    title: "Real Market Open (By Units)",
    method: "POST",
    path: "/trading/execution/market-open-orders/by-units",
    description: "Open a real position using amount in units.",
    fields: [
      {
        key: "InstrumentID",
        label: "InstrumentID",
        location: "body",
        required: true,
        type: "number",
      },
      {
        key: "IsBuy",
        label: "IsBuy",
        location: "body",
        required: true,
        type: "boolean",
        defaultValue: "true",
      },
      {
        key: "Leverage",
        label: "Leverage",
        location: "body",
        required: true,
        type: "number",
        defaultValue: "1",
      },
      {
        key: "AmountInUnits",
        label: "AmountInUnits",
        location: "body",
        required: true,
        type: "number",
      },
      { key: "StopLossRate", label: "StopLossRate", location: "body", type: "number" },
      { key: "TakeProfitRate", label: "TakeProfitRate", location: "body", type: "number" },
      { key: "IsTslEnabled", label: "IsTslEnabled", location: "body", type: "boolean" },
      { key: "IsNoStopLoss", label: "IsNoStopLoss", location: "body", type: "boolean" },
      { key: "IsNoTakeProfit", label: "IsNoTakeProfit", location: "body", type: "boolean" },
    ],
  },
  {
    id: "exec-demo-cancel-open",
    category: "Trading Execution",
    title: "Demo Cancel Market Open Order",
    method: "DELETE",
    path: "/trading/execution/demo/market-open-orders/{orderId}",
    description: "Cancel demo open order.",
    fields: [{ key: "orderId", label: "Order ID", location: "path", required: true }],
  },
  {
    id: "exec-real-cancel-open",
    category: "Trading Execution",
    title: "Real Cancel Market Open Order",
    method: "DELETE",
    path: "/trading/execution/market-open-orders/{orderId}",
    description: "Cancel real open order.",
    fields: [{ key: "orderId", label: "Order ID", location: "path", required: true }],
  },
  {
    id: "exec-demo-close-position",
    category: "Trading Execution",
    title: "Demo Close Position",
    method: "POST",
    path: "/trading/execution/demo/market-close-orders/positions/{positionId}",
    description: "Create market close order for a demo position.",
    fields: [
      { key: "positionId", label: "Position ID", location: "path", required: true },
      {
        key: "InstrumentId",
        label: "InstrumentId",
        location: "body",
        required: true,
        type: "number",
      },
      {
        key: "UnitsToDeduct",
        label: "UnitsToDeduct",
        location: "body",
        type: "number",
        allowNullLiteral: true,
        placeholder: "Leave blank or type null for full close",
      },
    ],
  },
  {
    id: "exec-real-close-position",
    category: "Trading Execution",
    title: "Real Close Position",
    method: "POST",
    path: "/trading/execution/market-close-orders/positions/{positionId}",
    description: "Create market close order for a real position.",
    fields: [
      { key: "positionId", label: "Position ID", location: "path", required: true },
      {
        key: "InstrumentId",
        label: "InstrumentId",
        location: "body",
        required: true,
        type: "number",
      },
      {
        key: "UnitsToDeduct",
        label: "UnitsToDeduct",
        location: "body",
        type: "number",
        allowNullLiteral: true,
        placeholder: "Leave blank or type null for full close",
      },
    ],
  },
  {
    id: "exec-demo-cancel-close",
    category: "Trading Execution",
    title: "Demo Cancel Market Close Order",
    method: "DELETE",
    path: "/trading/execution/demo/market-close-orders/{orderId}",
    description: "Cancel demo close order.",
    fields: [{ key: "orderId", label: "Order ID", location: "path", required: true }],
  },
  {
    id: "exec-real-cancel-close",
    category: "Trading Execution",
    title: "Real Cancel Market Close Order",
    method: "DELETE",
    path: "/trading/execution/market-close-orders/{orderId}",
    description: "Cancel real close order.",
    fields: [{ key: "orderId", label: "Order ID", location: "path", required: true }],
  },
  {
    id: "exec-demo-limit-create",
    category: "Trading Execution",
    title: "Demo Limit Order",
    method: "POST",
    path: "/trading/execution/demo/limit-orders",
    description: "Create demo market-if-touched (limit) order.",
    oneOfBodyFields: ["Amount", "AmountInUnits"],
    fields: [
      {
        key: "InstrumentID",
        label: "InstrumentID",
        location: "body",
        required: true,
        type: "number",
      },
      {
        key: "IsBuy",
        label: "IsBuy",
        location: "body",
        required: true,
        type: "boolean",
        defaultValue: "true",
      },
      {
        key: "Leverage",
        label: "Leverage",
        location: "body",
        required: true,
        type: "number",
        defaultValue: "1",
      },
      { key: "Rate", label: "Rate", location: "body", required: true, type: "number" },
      { key: "Amount", label: "Amount", location: "body", type: "number" },
      { key: "AmountInUnits", label: "AmountInUnits", location: "body", type: "number" },
      { key: "StopLossRate", label: "StopLossRate", location: "body", type: "number" },
      { key: "TakeProfitRate", label: "TakeProfitRate", location: "body", type: "number" },
      { key: "IsTslEnabled", label: "IsTslEnabled", location: "body", type: "boolean" },
      { key: "IsNoStopLoss", label: "IsNoStopLoss", location: "body", type: "boolean" },
      { key: "IsNoTakeProfit", label: "IsNoTakeProfit", location: "body", type: "boolean" },
    ],
  },
  {
    id: "exec-demo-limit-delete",
    category: "Trading Execution",
    title: "Delete Demo Limit Order",
    method: "DELETE",
    path: "/trading/execution/demo/limit-orders/{orderId}",
    description: "Delete demo limit order.",
    fields: [{ key: "orderId", label: "Order ID", location: "path", required: true }],
  },
  {
    id: "exec-real-limit-create",
    category: "Trading Execution",
    title: "Real Limit Order",
    method: "POST",
    path: "/trading/execution/limit-orders",
    description: "Create real market-if-touched (limit) order.",
    oneOfBodyFields: ["Amount", "AmountInUnits"],
    fields: [
      {
        key: "InstrumentID",
        label: "InstrumentID",
        location: "body",
        required: true,
        type: "number",
      },
      {
        key: "IsBuy",
        label: "IsBuy",
        location: "body",
        required: true,
        type: "boolean",
        defaultValue: "true",
      },
      {
        key: "Leverage",
        label: "Leverage",
        location: "body",
        required: true,
        type: "number",
        defaultValue: "1",
      },
      { key: "Rate", label: "Rate", location: "body", required: true, type: "number" },
      { key: "Amount", label: "Amount", location: "body", type: "number" },
      { key: "AmountInUnits", label: "AmountInUnits", location: "body", type: "number" },
      { key: "StopLossRate", label: "StopLossRate", location: "body", type: "number" },
      { key: "TakeProfitRate", label: "TakeProfitRate", location: "body", type: "number" },
      { key: "IsTslEnabled", label: "IsTslEnabled", location: "body", type: "boolean" },
      { key: "IsNoStopLoss", label: "IsNoStopLoss", location: "body", type: "boolean" },
      { key: "IsNoTakeProfit", label: "IsNoTakeProfit", location: "body", type: "boolean" },
    ],
  },
  {
    id: "exec-real-limit-delete",
    category: "Trading Execution",
    title: "Delete Real Limit Order",
    method: "DELETE",
    path: "/trading/execution/limit-orders/{orderId}",
    description: "Delete real limit order.",
    fields: [{ key: "orderId", label: "Order ID", location: "path", required: true }],
  },
  {
    id: "info-demo-pnl",
    category: "Trading Info",
    title: "Demo PnL",
    method: "GET",
    path: "/trading/info/demo/pnl",
    description: "Get demo profit and loss.",
    fields: [],
  },
  {
    id: "info-real-pnl",
    category: "Trading Info",
    title: "Real PnL",
    method: "GET",
    path: "/trading/info/real/pnl",
    description: "Get real profit and loss.",
    fields: [],
  },
  {
    id: "info-demo-portfolio",
    category: "Trading Info",
    title: "Demo Portfolio",
    method: "GET",
    path: "/trading/info/demo/portfolio",
    description: "List demo positions and orders.",
    fields: [],
  },
  {
    id: "info-real-portfolio",
    category: "Trading Info",
    title: "Real Portfolio",
    method: "GET",
    path: "/trading/info/portfolio",
    description: "List real positions and orders.",
    fields: [],
  },
  {
    id: "info-trade-history",
    category: "Trading Info",
    title: "Trade History",
    method: "GET",
    path: "/trading/info/trade/history",
    description: "Get trade history by date window.",
    fields: [
      {
        key: "minDate",
        label: "minDate",
        location: "query",
        required: true,
        placeholder: "YYYY-MM-DD",
      },
      { key: "page", label: "Page", location: "query", type: "number" },
      { key: "pageSize", label: "Page Size", location: "query", type: "number" },
    ],
  },
  {
    id: "watchlists-list",
    category: "Watchlists",
    title: "List Watchlists",
    method: "GET",
    path: "/watchlists",
    description: "List user watchlists.",
    fields: [
      {
        key: "itemsPerPageForSingle",
        label: "itemsPerPageForSingle",
        location: "query",
        type: "number",
      },
      {
        key: "ensureBuiltinWatchlists",
        label: "ensureBuiltinWatchlists",
        location: "query",
        type: "boolean",
      },
      { key: "addRelatedAssets", label: "addRelatedAssets", location: "query", type: "boolean" },
    ],
  },
  {
    id: "watchlists-get-one",
    category: "Watchlists",
    title: "Get Watchlist",
    method: "GET",
    path: "/watchlists/{watchlistId}",
    description: "Read a specific watchlist and paged items.",
    fields: [
      { key: "watchlistId", label: "Watchlist ID", location: "path", required: true },
      { key: "pageNumber", label: "Page Number", location: "query", type: "number" },
      { key: "itemsPerPage", label: "Items Per Page", location: "query", type: "number" },
    ],
  },
  {
    id: "watchlists-create",
    category: "Watchlists",
    title: "Create Watchlist",
    method: "POST",
    path: "/watchlists",
    description: "Create watchlist with query parameters.",
    fields: [
      { key: "name", label: "Name", location: "query", required: true },
      { key: "type", label: "Type", location: "query" },
      { key: "dynamicQuery", label: "dynamicQuery", location: "query" },
    ],
  },
  {
    id: "watchlists-rename",
    category: "Watchlists",
    title: "Rename Watchlist",
    method: "PUT",
    path: "/watchlists/{watchlistId}",
    description: "Rename existing watchlist.",
    fields: [
      { key: "watchlistId", label: "Watchlist ID", location: "path", required: true },
      { key: "newName", label: "newName", location: "query", required: true },
    ],
  },
  {
    id: "watchlists-delete",
    category: "Watchlists",
    title: "Delete Watchlist",
    method: "DELETE",
    path: "/watchlists/{watchlistId}",
    description: "Delete watchlist.",
    fields: [{ key: "watchlistId", label: "Watchlist ID", location: "path", required: true }],
  },
  {
    id: "watchlists-items-add",
    category: "Watchlists",
    title: "Add Watchlist Items",
    method: "POST",
    path: "/watchlists/{watchlistId}/items",
    description: "Add items to watchlist using WatchlistItemDto array body.",
    fields: [
      { key: "watchlistId", label: "Watchlist ID", location: "path", required: true },
      {
        key: "rawBody",
        label: "JSON Body",
        location: "body",
        type: "textarea",
        required: true,
        defaultValue: '[\n  { "ItemId": 12345, "ItemType": "Instrument", "ItemRank": 1 }\n]',
      },
    ],
  },
  {
    id: "watchlists-items-update",
    category: "Watchlists",
    title: "Update Watchlist Items",
    method: "PUT",
    path: "/watchlists/{watchlistId}/items",
    description: "Update watchlist items using WatchlistItemDto array body.",
    fields: [
      { key: "watchlistId", label: "Watchlist ID", location: "path", required: true },
      {
        key: "rawBody",
        label: "JSON Body",
        location: "body",
        type: "textarea",
        required: true,
        defaultValue: '[\n  { "ItemId": 12345, "ItemType": "Instrument", "ItemRank": 1 }\n]',
      },
    ],
  },
  {
    id: "watchlists-items-delete",
    category: "Watchlists",
    title: "Delete Watchlist Items",
    method: "DELETE",
    path: "/watchlists/{watchlistId}/items",
    description: "Delete watchlist items using WatchlistItemDto array body.",
    fields: [
      { key: "watchlistId", label: "Watchlist ID", location: "path", required: true },
      {
        key: "rawBody",
        label: "JSON Body",
        location: "body",
        type: "textarea",
        required: true,
        defaultValue: '[\n  { "ItemId": 12345, "ItemType": "Instrument" }\n]',
      },
    ],
  },
  {
    id: "watchlists-default-selected",
    category: "Watchlists",
    title: "Set Default Watchlist Selected Items",
    method: "POST",
    path: "/watchlists/default-watchlist/selected-items",
    description: "Select items in default watchlist.",
    fields: [
      {
        key: "rawBody",
        label: "JSON Body",
        location: "body",
        type: "textarea",
        defaultValue: "[]",
        required: true,
      },
    ],
  },
  {
    id: "watchlists-default-items",
    category: "Watchlists",
    title: "Get Default Watchlists Items",
    method: "GET",
    path: "/watchlists/default-watchlists/items",
    description: "List default watchlist items.",
    fields: [
      { key: "itemsLimit", label: "itemsLimit", location: "query", type: "number" },
      { key: "itemsPerPage", label: "itemsPerPage", location: "query", type: "number" },
    ],
  },
  {
    id: "watchlists-new-default",
    category: "Watchlists",
    title: "Create New as Default Watchlist",
    method: "POST",
    path: "/watchlists/newasdefault-watchlist",
    description: "Create and set as default watchlist.",
    fields: [
      { key: "name", label: "Name", location: "query", required: true },
      { key: "type", label: "Type", location: "query" },
      { key: "dynamicQuery", label: "dynamicQuery", location: "query" },
    ],
  },
  {
    id: "watchlists-set-default",
    category: "Watchlists",
    title: "Set User Default Watchlist",
    method: "PUT",
    path: "/watchlists/setUserSelectedUserDefault/{watchlistId}",
    description: "Set watchlist as user default.",
    fields: [{ key: "watchlistId", label: "Watchlist ID", location: "path", required: true }],
  },
  {
    id: "watchlists-rank",
    category: "Watchlists",
    title: "Set Watchlist Rank",
    method: "PUT",
    path: "/watchlists/rank/{watchlistId}",
    description: "Update watchlist ordering rank.",
    fields: [
      { key: "watchlistId", label: "Watchlist ID", location: "path", required: true },
      { key: "newRank", label: "newRank", location: "query", required: true, type: "number" },
    ],
  },
  {
    id: "watchlists-public-list",
    category: "Watchlists",
    title: "Public Watchlists by User",
    method: "GET",
    path: "/watchlists/public/{userId}",
    description: "Get public watchlists for a user.",
    fields: [{ key: "userId", label: "User ID (CID)", location: "path", required: true }],
  },
  {
    id: "watchlists-public-one",
    category: "Watchlists",
    title: "Public Watchlist by User + ID",
    method: "GET",
    path: "/watchlists/public/{userId}/{watchlistId}",
    description: "Get one public watchlist.",
    fields: [
      { key: "userId", label: "User ID (CID)", location: "path", required: true },
      { key: "watchlistId", label: "Watchlist ID", location: "path", required: true },
    ],
  },
  {
    id: "feeds-instrument",
    category: "Feeds",
    title: "Instrument Feed",
    method: "GET",
    path: "/feeds/instrument/{marketId}",
    description: "Read social feed for an instrument market.",
    fields: [
      { key: "marketId", label: "Market ID", location: "path", required: true },
      { key: "requesterUserId", label: "requesterUserId", location: "query" },
      { key: "take", label: "take", location: "query", type: "number" },
      { key: "offset", label: "offset", location: "query", type: "number" },
      {
        key: "badgesExperimentIsEnabled",
        label: "badgesExperimentIsEnabled",
        location: "query",
        type: "boolean",
      },
      { key: "reactionsPageSize", label: "reactionsPageSize", location: "query", type: "number" },
    ],
  },
  {
    id: "feeds-user",
    category: "Feeds",
    title: "User Feed",
    method: "GET",
    path: "/feeds/user/{userId}",
    description: "Read social feed for a user.",
    fields: [
      { key: "userId", label: "User ID (CID)", location: "path", required: true },
      { key: "requesterUserId", label: "requesterUserId", location: "query" },
      { key: "take", label: "take", location: "query", type: "number" },
      { key: "offset", label: "offset", location: "query", type: "number" },
      {
        key: "badgesExperimentIsEnabled",
        label: "badgesExperimentIsEnabled",
        location: "query",
        type: "boolean",
      },
      { key: "reactionsPageSize", label: "reactionsPageSize", location: "query", type: "number" },
    ],
  },
  {
    id: "feeds-post",
    category: "Feeds",
    title: "Create Feed Post",
    method: "POST",
    path: "/feeds/post",
    description: "Create a post using lower camel body schema.",
    fields: [
      {
        key: "rawBody",
        label: "JSON Body",
        location: "body",
        type: "textarea",
        required: true,
        defaultValue: '{\n  "message": "Hello eToro feed!"\n}',
      },
    ],
  },
  {
    id: "curated-lists",
    category: "Discovery",
    title: "Curated Lists",
    method: "GET",
    path: "/curated-lists",
    description: "Get curated market lists.",
    fields: [],
  },
  {
    id: "market-recommendations",
    category: "Discovery",
    title: "Market Recommendations",
    method: "GET",
    path: "/market-recommendations/{itemsCount}",
    description: "Get recommendations with item count.",
    fields: [
      {
        key: "itemsCount",
        label: "itemsCount",
        location: "path",
        required: true,
        type: "number",
        defaultValue: "10",
      },
    ],
  },
  {
    id: "pi-copiers",
    category: "Discovery",
    title: "Popular Investor Copiers",
    method: "GET",
    path: "/pi-data/copiers",
    description: "Get copiers data.",
    fields: [],
  },
  {
    id: "people",
    category: "User Info",
    title: "People by username/CID",
    method: "GET",
    path: "/user-info/people",
    description: "Map usernames and CIDs.",
    fields: [
      { key: "usernames", label: "usernames (comma-separated)", location: "query" },
      { key: "cidList", label: "cidList (comma-separated)", location: "query" },
    ],
  },
  {
    id: "people-search",
    category: "User Info",
    title: "People Search",
    method: "GET",
    path: "/user-info/people/search",
    description: "Filter/search users by period, risk, gain and other filters.",
    fields: [
      {
        key: "period",
        label: "period",
        location: "query",
        required: true,
        defaultValue: "LastTwoYears",
      },
      { key: "page", label: "page", location: "query", type: "number" },
      { key: "pageSize", label: "pageSize", location: "query", type: "number" },
      { key: "sort", label: "sort", location: "query" },
      { key: "popularInvestor", label: "popularInvestor", location: "query", type: "boolean" },
      { key: "gainMax", label: "gainMax", location: "query", type: "number" },
      { key: "countryId", label: "countryId", location: "query", type: "number" },
      { key: "instrumentId", label: "instrumentId", location: "query", type: "number" },
      { key: "isTestAccount", label: "isTestAccount", location: "query", type: "boolean" },
    ],
  },
  {
    id: "people-gain",
    category: "User Info",
    title: "User Gain",
    method: "GET",
    path: "/user-info/people/{username}/gain",
    description: "Get gain summary by username.",
    fields: [{ key: "username", label: "Username", location: "path", required: true }],
  },
  {
    id: "people-daily-gain",
    category: "User Info",
    title: "User Daily Gain",
    method: "GET",
    path: "/user-info/people/{username}/daily-gain",
    description: "Get daily or period gains by date range.",
    fields: [
      { key: "username", label: "Username", location: "path", required: true },
      {
        key: "minDate",
        label: "minDate",
        location: "query",
        required: true,
        placeholder: "YYYY-MM-DD",
      },
      {
        key: "maxDate",
        label: "maxDate",
        location: "query",
        required: true,
        placeholder: "YYYY-MM-DD",
      },
      {
        key: "type",
        label: "type",
        location: "query",
        required: true,
        defaultValue: "Daily",
        placeholder: "Daily or Period",
      },
    ],
  },
  {
    id: "people-portfolio-live",
    category: "User Info",
    title: "User Portfolio Live",
    method: "GET",
    path: "/user-info/people/{username}/portfolio/live",
    description: "Get live portfolio for a public user profile.",
    fields: [{ key: "username", label: "Username", location: "path", required: true }],
  },
  {
    id: "people-tradeinfo",
    category: "User Info",
    title: "User Trade Info",
    method: "GET",
    path: "/user-info/people/{username}/tradeinfo",
    description: "Get user trade info for a period.",
    fields: [
      { key: "username", label: "Username", location: "path", required: true },
      {
        key: "period",
        label: "period",
        location: "query",
        required: true,
        defaultValue: "LastTwoYears",
      },
    ],
  },
];

const endpointMap = new Map(endpoints.map((endpoint) => [endpoint.id, endpoint]));

function buildInitialValues(endpoint: Endpoint): Record<string, string> {
  return endpoint.fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.key] = field.defaultValue ?? "";
    return acc;
  }, {});
}

function toTypedValue(field: EndpointField, value: string): unknown {
  if (field.allowNullLiteral && value.trim().toLowerCase() === "null") {
    return null;
  }

  if ((field.type ?? "text") === "number") {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      throw new Error(`"${field.label}" must be a valid number.`);
    }
    return parsed;
  }

  if ((field.type ?? "text") === "boolean") {
    if (value !== "true" && value !== "false") {
      throw new Error(`"${field.label}" must be true or false.`);
    }
    return value === "true";
  }

  return value;
}

function empty(value: string | undefined): boolean {
  return !value || value.trim() === "";
}

function normalizeQueryValue(field: EndpointField, raw: string): string {
  const trimmed = raw.trim();
  const isCommaSeparatedField =
    field.key === "fields" || field.label.toLowerCase().includes("comma-separated");

  if (!isCommaSeparatedField) {
    return trimmed;
  }

  // Normalize comma-separated values so URLSearchParams encodes commas consistently.
  return trimmed
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join(",");
}

function isCommaSeparatedField(field: EndpointField): boolean {
  return field.key === "fields" || field.label.toLowerCase().includes("comma-separated");
}

function encodeQueryValue(field: EndpointField, value: string): string {
  if (!isCommaSeparatedField(field)) {
    return encodeURIComponent(value);
  }

  // eToro search endpoints expect literal commas in some list-style query params.
  return value
    .split(",")
    .map((part) => encodeURIComponent(part))
    .join(",");
}

export function ComponentExample() {
  const [credentials, setCredentials] = React.useState({
    apiKey: "",
    userKey: "",
    requestId: "",
  });

  const [valuesByEndpoint, setValuesByEndpoint] = React.useState<
    Record<string, Record<string, string>>
  >(() => {
    const initial: Record<string, Record<string, string>> = {};
    for (const endpoint of endpoints) {
      initial[endpoint.id] = buildInitialValues(endpoint);
    }
    return initial;
  });

  const [responses, setResponses] = React.useState<Record<string, ApiResponse | null>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState<Record<string, boolean>>({});

  const setField = React.useCallback((endpointId: string, key: string, value: string) => {
    setValuesByEndpoint((previous) => ({
      ...previous,
      [endpointId]: {
        ...(previous[endpointId] ?? {}),
        [key]: value,
      },
    }));
  }, []);

  const runEndpoint = React.useCallback(
    async (endpointId: string) => {
      const endpoint = endpointMap.get(endpointId);
      if (!endpoint) {
        return;
      }

      const values = valuesByEndpoint[endpointId] ?? {};

      setLoading((previous) => ({ ...previous, [endpointId]: true }));
      setErrors((previous) => ({ ...previous, [endpointId]: "" }));
      setResponses((previous) => ({ ...previous, [endpointId]: null }));

      try {
        if (empty(credentials.apiKey) || empty(credentials.userKey)) {
          throw new Error("Please fill x-api-key and x-user-key first.");
        }

        let resolvedPath = endpoint.path;
        const queryParts: string[] = [];

        for (const field of endpoint.fields) {
          const raw = values[field.key];
          const valueIsEmpty = empty(raw);

          if (field.required && valueIsEmpty) {
            throw new Error(`"${field.label}" is required.`);
          }

          if (valueIsEmpty) {
            continue;
          }

          if (field.location === "path") {
            resolvedPath = resolvedPath.replace(`{${field.key}}`, encodeURIComponent(raw));
          }

          if (field.location === "query") {
            const normalizedValue = normalizeQueryValue(field, raw);
            queryParts.push(
              `${encodeURIComponent(field.key)}=${encodeQueryValue(field, normalizedValue)}`,
            );
          }
        }

        if (resolvedPath.includes("{")) {
          throw new Error("Some required path params are missing.");
        }

        const bodyFields = endpoint.fields.filter((field) => field.location === "body");
        let body: unknown;

        if (bodyFields.length > 0) {
          const rawBodyField = bodyFields.find((field) => field.key === "rawBody");
          if (rawBodyField) {
            const rawBody = values.rawBody;
            if (rawBodyField.required && empty(rawBody)) {
              throw new Error("JSON body is required.");
            }
            body = rawBody ? JSON.parse(rawBody) : {};
          } else {
            const payload: Record<string, unknown> = {};

            for (const field of bodyFields) {
              const raw = values[field.key];
              const valueIsEmpty = empty(raw);

              if (field.required && valueIsEmpty) {
                throw new Error(`"${field.label}" is required.`);
              }
              if (valueIsEmpty) {
                continue;
              }
              payload[field.key] = toTypedValue(field, raw);
            }

            if (endpoint.oneOfBodyFields && endpoint.oneOfBodyFields.length > 0) {
              const hasOne = endpoint.oneOfBodyFields.some(
                (fieldKey) => payload[fieldKey] !== undefined,
              );
              if (!hasOne) {
                throw new Error(`One of ${endpoint.oneOfBodyFields.join(", ")} is required.`);
              }
            }

            body = payload;
          }
        }

        const requestId = empty(credentials.requestId)
          ? crypto.randomUUID()
          : credentials.requestId;
        const queryString = queryParts.join("&");
        const url = `${BASE_URL}${resolvedPath}${queryString ? `?${queryString}` : ""}`;

        const headers: Record<string, string> = {
          "x-api-key": credentials.apiKey,
          "x-user-key": credentials.userKey,
          "x-request-id": requestId,
        };

        if (body !== undefined) {
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
          method: endpoint.method,
          headers,
          body: body !== undefined ? JSON.stringify(body) : undefined,
        });

        const text = await response.text();
        let payload: unknown = text;
        if (!empty(text)) {
          try {
            payload = JSON.parse(text);
          } catch {
            payload = text;
          }
        }

        setResponses((previous) => ({
          ...previous,
          [endpointId]: {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            url,
            payload,
          },
        }));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Request failed.";
        setErrors((previous) => ({ ...previous, [endpointId]: message }));
      } finally {
        setLoading((previous) => ({ ...previous, [endpointId]: false }));
      }
    },
    [credentials.apiKey, credentials.requestId, credentials.userKey, valuesByEndpoint],
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>eToro Endpoint Playground</CardTitle>
          <CardDescription>
            One card per endpoint from the eToro skill. Fill credentials once, then run any
            endpoint.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium">x-api-key</label>
            <Input
              value={credentials.apiKey}
              onChange={(event) =>
                setCredentials((previous) => ({ ...previous, apiKey: event.target.value }))
              }
              placeholder="Public API key"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium">x-user-key</label>
            <Input
              value={credentials.userKey}
              onChange={(event) =>
                setCredentials((previous) => ({ ...previous, userKey: event.target.value }))
              }
              placeholder="User key"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium">x-request-id (optional)</label>
            <Input
              value={credentials.requestId}
              onChange={(event) =>
                setCredentials((previous) => ({ ...previous, requestId: event.target.value }))
              }
              placeholder="UUID (auto-generated if empty)"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {endpoints.map((endpoint) => {
          const values = valuesByEndpoint[endpoint.id] ?? {};
          const response = responses[endpoint.id];
          const error = errors[endpoint.id];

          return (
            <Card key={endpoint.id} className="h-full">
              <CardHeader className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{endpoint.category}</Badge>
                  <Badge>{endpoint.method}</Badge>
                </div>
                <CardTitle className="text-sm">{endpoint.title}</CardTitle>
                <CardDescription className="space-y-1">
                  <p>{endpoint.description}</p>
                  <code className="bg-muted inline-block rounded px-2 py-1 text-xs">
                    {endpoint.path}
                  </code>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {endpoint.fields.length === 0 ? (
                  <p className="text-muted-foreground text-xs">
                    No endpoint-specific inputs required.
                  </p>
                ) : (
                  endpoint.fields.map((field) => {
                    const type = field.type ?? "text";
                    const inputValue = values[field.key] ?? "";

                    return (
                      <div key={`${endpoint.id}-${field.key}`} className="space-y-1">
                        <label className="text-xs font-medium">
                          {field.label}
                          {field.required ? " *" : ""}
                          <span className="text-muted-foreground ml-1">({field.location})</span>
                        </label>
                        {type === "textarea" ? (
                          <Textarea
                            value={inputValue}
                            onChange={(event) =>
                              setField(endpoint.id, field.key, event.target.value)
                            }
                            placeholder={field.placeholder}
                            className="min-h-24 font-mono text-xs"
                          />
                        ) : type === "boolean" ? (
                          <Select
                            value={inputValue}
                            onValueChange={(value) => setField(endpoint.id, field.key, value ?? "")}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="true">true</SelectItem>
                                <SelectItem value="false">false</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            type={type === "number" ? "number" : "text"}
                            value={inputValue}
                            onChange={(event) =>
                              setField(endpoint.id, field.key, event.target.value)
                            }
                            placeholder={field.placeholder}
                          />
                        )}
                        {field.description ? (
                          <p className="text-muted-foreground text-xs">{field.description}</p>
                        ) : null}
                      </div>
                    );
                  })
                )}

                <Button
                  onClick={() => runEndpoint(endpoint.id)}
                  disabled={loading[endpoint.id]}
                  className="w-full"
                >
                  {loading[endpoint.id] ? "Running..." : "Submit"}
                </Button>

                {error ? (
                  <div className="text-destructive rounded-xl border border-current/20 p-3 text-xs">
                    {error}
                  </div>
                ) : null}

                {response ? (
                  <div className="space-y-2 rounded-xl border p-3">
                    <p className="text-xs">
                      <span className="font-medium">Status:</span> {response.status}{" "}
                      {response.statusText}
                    </p>
                    <p className="text-xs break-all">
                      <span className="font-medium">URL:</span> {response.url}
                    </p>
                    <pre className="bg-muted max-h-56 overflow-auto rounded-lg p-2 text-[11px]">
                      {JSON.stringify(response.payload, null, 2)}
                    </pre>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
