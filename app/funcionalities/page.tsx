import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/transition-link";

const portfolioCapabilities = [
  {
    title: "Custom Portfolio Groups",
    description:
      "Create custom groups like High Conviction, Monthly DCA, or Hedging and assign assets to each strategy lane.",
  },
  {
    title: "Watchlists in Screener Mode",
    description:
      "Open watchlists in screener view with more fields than eToro: risk score, spread, volume trend, beta, and earnings date.",
  },
  {
    title: "Group-Level Performance",
    description:
      "Track P&L, drawdown, volatility, and Sharpe ratio for every custom group, not only for the total portfolio.",
  },
  {
    title: "Rule-Based Rebalancing",
    description:
      "Set target allocations and trigger rebalancing by schedule, drift threshold, or market conditions.",
  },
  {
    title: "AI Strategy Assistant",
    description:
      "Describe a strategy in plain language and generate alerts, rebalancing rules, and action plans instantly.",
  },
  {
    title: "Scenario Simulator",
    description:
      "Run what-if scenarios (rate cuts, sector rotation, crypto pullback) and estimate impact before placing trades.",
  },
  {
    title: "Smart Alerts Hub",
    description:
      "Get multi-condition alerts that combine price, volatility, volume spikes, and macro events in one signal.",
  },
  {
    title: "News and Earnings Digest",
    description:
      "Receive a daily summary per watchlist with sentiment, earnings surprises, and key catalysts.",
  },
  {
    title: "Automation Workflows",
    description:
      "Build no-code workflows such as If portfolio risk > X, reduce exposure and notify me on email and Slack.",
  },
];

export default function AppFunctionalitiesPage() {
  return (
    <div className="bg-background min-h-screen px-4 py-12">
      <main className="route-fade mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <TransitionLink href="/" className="w-fit">
            <Button variant="secondary">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={18} className="mr-1" />
              Back to home
            </Button>
          </TransitionLink>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-mono tracking-wide">Available Capabilities</h1>
            <p className="text-muted-foreground max-w-3xl">
              Explore nine example capabilities you can ship with this template. These are
              product-ready ideas for custom portfolio management beyond standard trading
              dashboards.
            </p>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioCapabilities.map((capability) => (
            <Card key={capability.title} className="h-full">
              <CardHeader>
                <CardTitle>{capability.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{capability.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
