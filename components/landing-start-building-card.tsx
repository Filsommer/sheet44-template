"use client";

import {
  ArrowRight01Icon,
  BarChartHorizontalIcon,
  BarChartIcon,
  BubbleChatQuestionIcon,
  WebProgrammingIcon,
} from "@hugeicons/core-free-icons";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const chartData = [
  { month: "Jan", portfolio: 360, benchmark: 220 },
  { month: "Feb", portfolio: 560, benchmark: 390 },
  { month: "Mar", portfolio: 450, benchmark: 290 },
  { month: "Apr", portfolio: 210, benchmark: 370 },
  { month: "May", portfolio: 410, benchmark: 310 },
  { month: "Jun", portfolio: 420, benchmark: 330 },
];

const chartConfig = {
  portfolio: {
    label: "Portfolio",
    color: "var(--chart-1)",
  },
  benchmark: {
    label: "Benchmark",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const starterIdeas = [
  "Schedule actions (e.g. every two weeks, trade BTC if it is below 100k).",
  "Create alerts (send a daily email with a summary of the biggest news in the S&P 500).",
  "Rebalance portfolio targets automatically by risk profile.",
  "Track favorite assets and get notified when volatility spikes.",
];

export function LandingStartBuildingCard() {
  return (
    <Dialog>
      <Card className="relative w-full max-w-sm overflow-hidden pt-0">
        <CardHeader className="pt-2">
          <ChartContainer config={chartConfig} className="w-full">
            <BarChart accessibilityLayer data={chartData}>
              {/* <CartesianGrid vertical={false} /> */}
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="portfolio" fill="var(--color-primary)" radius={4} />
              <Bar dataKey="benchmark" fill="var(--color-border)" radius={4} />
            </BarChart>
          </ChartContainer>
          <CardTitle>Start building</CardTitle>
          <CardDescription>
            Start from a pre-built chart and turn it into workflows, alerts, and automations.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <DialogTrigger render={<Button className="w-full" />}>
            Start Building{" "}
            <HugeiconsIcon icon={BubbleChatQuestionIcon} size={18} className="ml-1" />
          </DialogTrigger>
        </CardFooter>
      </Card>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ideas to start quickly</DialogTitle>
          <DialogDescription>
            Pick one workflow and ship a first version today. These are non-technical examples you
            can customize.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-3 text-sm">
          {starterIdeas.map((idea) => (
            <li key={idea} className="bg-muted/50 rounded-lg border px-3 py-2">
              {idea}
            </li>
          ))}
        </ul>

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}
