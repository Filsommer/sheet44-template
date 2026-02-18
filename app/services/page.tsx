"use client";

import * as React from "react";
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ServiceCategory =
  | "Market Data"
  | "Watchlists"
  | "Trading"
  | "Feeds"
  | "Discovery"
  | "User Insights";

type ServiceItem = {
  title: string;
  category: ServiceCategory;
  summary: string;
};

const services: ServiceItem[] = [
  {
    title: "Search markets quickly",
    category: "Market Data",
    summary: "Find assets by name or ticker and get key details to power watchlists and dashboards.",
  },
  {
    title: "Get live prices",
    category: "Market Data",
    summary: "Pull fresh price updates for assets so users can act on the latest market moves.",
  },
  {
    title: "Track price history",
    category: "Market Data",
    summary: "Use candles and historical data to build trend charts and compare performance.",
  },
  {
    title: "Manage watchlists",
    category: "Watchlists",
    summary: "Create, rename, rank, and organize watchlists so users can monitor what matters most.",
  },
  {
    title: "Manage watchlist items",
    category: "Watchlists",
    summary: "Add, update, and remove assets from watchlists with flexible item controls.",
  },
  {
    title: "Open and close positions",
    category: "Trading",
    summary: "Support market open/close actions for demo and real trading flows.",
  },
  {
    title: "Create and cancel limit orders",
    category: "Trading",
    summary: "Allow users to set target entry prices and cancel pending orders when plans change.",
  },
  {
    title: "View portfolio and PnL",
    category: "Trading",
    summary: "Show open positions, order state, and profit/loss snapshots in one place.",
  },
  {
    title: "Read social feeds",
    category: "Feeds",
    summary: "Display user and instrument feed activity to add market sentiment context.",
  },
  {
    title: "Create posts",
    category: "Feeds",
    summary: "Enable publishing social updates directly from your app experience.",
  },
  {
    title: "Show curated lists and recommendations",
    category: "Discovery",
    summary: "Surface featured assets and suggestions to help users discover opportunities.",
  },
  {
    title: "Search people and profile stats",
    category: "User Insights",
    summary: "Retrieve investor profiles, gains, and activity metrics for comparison and analysis.",
  },
];

const categories: ServiceCategory[] = [
  "Market Data",
  "Watchlists",
  "Trading",
  "Feeds",
  "Discovery",
  "User Insights",
];

function categoryId(category: ServiceCategory): string {
  return `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function ServicesPage() {
  const [allSelected, setAllSelected] = React.useState(true);
  const [selectedCategories, setSelectedCategories] = React.useState<ServiceCategory[]>(categories);

  const filteredServices = allSelected
    ? services
    : services.filter((service) => selectedCategories.includes(service.category));

  function toggleAll(checked: boolean) {
    setAllSelected(checked);
    setSelectedCategories(checked ? categories : []);
  }

  function toggleCategory(category: ServiceCategory, checked: boolean) {
    const next = checked
      ? [...new Set([...selectedCategories, category])]
      : selectedCategories.filter((item) => item !== category);

    setSelectedCategories(next);
    setAllSelected(next.length === categories.length);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <p className="text-muted-foreground text-sm">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          {" / "}
          <span className="text-foreground">Services</span>
        </p>
        <h1 className="text-primary text-3xl font-bold">Available app functionalities</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          This page summarizes what your app can do using eToro capabilities, written for product
          and business teams.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Filter by capability</CardTitle>
          <CardDescription>Default view is All. Uncheck to focus on specific areas.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={allSelected}
              onCheckedChange={(checked) => toggleAll(checked === true)}
              id="all-categories"
            />
            <Label htmlFor="all-categories">All</Label>
          </div>

          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => toggleCategory(category, checked === true)}
                id={categoryId(category)}
              />
              <Label htmlFor={categoryId(category)}>{category}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        {filteredServices.map((service) => (
          <Card key={`${service.category}-${service.title}`} className="rounded-xl shadow-sm">
            <CardHeader>
              <CardDescription>{service.category}</CardDescription>
              <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{service.summary}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
