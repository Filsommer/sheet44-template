"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TransitionLink } from "@/components/transition-link";

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
    summary:
      "Find assets by name or ticker and get key details to power watchlists and dashboards.",
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
    summary:
      "Create, rename, rank, and organize watchlists so users can monitor what matters most.",
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

export default function ServicesPage() {
  const [selectedCategories, setSelectedCategories] = React.useState<ServiceCategory[]>(categories);
  const allSelected = selectedCategories.length === categories.length;

  const filteredServices = allSelected
    ? services
    : services.filter((service) => selectedCategories.includes(service.category));

  function selectAll() {
    setSelectedCategories(categories);
  }

  function toggleCategory(category: ServiceCategory) {
    if (allSelected) {
      setSelectedCategories([category]);
      return;
    }

    const isSelected = selectedCategories.includes(category);
    if (isSelected) {
      const next = selectedCategories.filter((item) => item !== category);
      setSelectedCategories(next.length === 0 ? categories : next);
      return;
    }

    setSelectedCategories([...selectedCategories, category]);
  }

  return (
    <main className="route-fade mx-auto min-h-screen w-full max-w-6xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4">
        <TransitionLink href="/" className="w-fit block pb-2">
          <Button variant="secondary">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} className="mr-1" />
            Back to home
          </Button>
        </TransitionLink>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-mono tracking-wide">Available eToro Data</h1>
          <p className="text-muted-foreground max-w-3xl text-sm">
            Explore product-ready capabilities powered by eToro services, written in plain language
            for business and product teams.
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Filter by capability</CardTitle>
          <CardDescription>
            All is selected by default. Click categories to filter one or multiple capabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <Button
            type="button"
            variant={allSelected ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={selectAll}
            aria-pressed={allSelected}
          >
            All
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              type="button"
              variant={
                selectedCategories.includes(category) && !allSelected ? "default" : "outline"
              }
              size="sm"
              className="rounded-full"
              onClick={() => toggleCategory(category)}
              aria-pressed={selectedCategories.includes(category) && !allSelected}
            >
              {category}
            </Button>
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
