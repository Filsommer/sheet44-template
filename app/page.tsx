import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, BubbleChatQuestionIcon } from "@hugeicons/core-free-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChartBreakdown } from "@/components/ui/breakdown-chart";
import { BarChartMultiVertical } from "@/components/ui/bar-chart";
import { TransitionLink } from "@/components/transition-link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const starterIdeas = [
  "Schedule actions (e.g. every two weeks, trade BTC if it is below 100k).",
  "Create alerts (send a daily email with a summary of the biggest news in the S&P 500).",
  "Rebalance portfolio targets automatically by risk profile.",
  "Track favorite assets and get notified when volatility spikes.",
];

export default function Page() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <main className="flex w-full max-w-4xl flex-col items-center gap-8">
        {/* <div
          className="bg-primary/10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
          aria-hidden
        >
          <HugeiconsIcon icon={WebProgrammingIcon} size={28} className="text-primary" />
        </div> */}

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative w-40 h-full mx-auto flex items-center justify-center">
            <svg version="1.1" viewBox="0 0 156 49" xmlns="http://www.w3.org/2000/svg">
              <title>eToro</title>
              <path
                className="fill-foreground"
                d="m155.7 18.1c-0.9-3.4-7.9-11.2-13-17.5-0.1-0.1-0.4-0.6-1-0.6-0.5 0-0.9 0.5-0.7 0.9s5.1 10.6 4.2 13.9c-0.9 3.4-5.4 2.7-6.1 2.7-0.4 0-0.1 0.3 0.3 0.7 2.5 2.2 4.1 5.3 4.1 9.3v3c0 0.1 0 0.1 0.1 0.1 5.7-0.5 14.4-4 12.1-12.5"
              ></path>
              <path
                className="fill-foreground"
                d="m133.6 37.8c0 2.9-3.9 4.5-6.4 4.5-2.7 0-6.5-1.6-6.5-4.5v-10.2c0-2.9 3.8-4.2 6.5-4.2 2.5 0 6.4 1.4 6.4 4.2v10.2zm-6.4-20.8c-6 0.1-13 3.5-13 10.5v10.7c0 7.1 7 10.5 13 10.5 5.9-0.1 12.9-3.4 12.9-10.5v-10.6c0-7-7-10.5-12.9-10.6"
              ></path>
              <path
                className="fill-foreground"
                d="m88.4 37.8c0 2.9-3.9 4.5-6.4 4.5-2.7 0-6.5-1.6-6.5-4.5v-10.2c0-2.9 3.8-4.2 6.5-4.2 2.5 0 6.4 1.4 6.4 4.2v10.2zm-6.5-20.8c-6 0.1-13 3.5-13 10.5v10.7c0 7.1 7 10.5 13 10.5 5.9-0.1 12.9-3.4 12.9-10.5v-10.6c0-7-7-10.5-12.9-10.6"
              ></path>
              <path
                className="fill-foreground"
                d="m16.7 18.2c0.4-0.4 0.7-0.7 0.3-0.7-0.7 0-5.2 0.7-6.1-2.7s4-13.5 4.2-13.9c0.1-0.4-0.2-0.9-0.8-0.9-0.5 0-0.9 0.6-1 0.6-5 6.3-12.1 14.1-13 17.5-2.3 8.5 6.6 12 12.2 12.6 0.1 0 0.1-0.1 0.1-0.1v-3c0.1-4.1 1.6-7.2 4.1-9.4"
              ></path>
              <path
                className="fill-foreground"
                d="m68.5 19.4c-4.8-1.3-8.3-1.8-13.5-1.8-5.1 0-8.7 0.5-13.5 1.8-0.2 0.1-0.3 0.3-0.2 0.4 1.6 1.4 2.3 3.2 2.6 5.2 2.6-0.6 5-1 7.8-1.2v24.7c0 0.1 0.1 0.1 0.2 0.1h6.2c0.1 0 0.2 0 0.2-0.1v-24.7c2.7 0.2 4.9 0.5 7.5 1.2 0.4-2 1.2-3.9 2.9-5.2 0-0.2-0.1-0.4-0.2-0.4"
              ></path>
              <path
                className="fill-foreground"
                d="m114.4 17.3c-0.5-0.1-1.8-0.3-3-0.2-5.9 0.2-12.6 3.7-12.6 10.5v21.1c0 0.1 0.1 0.1 0.2 0.1h6.2c0.1 0 0.2 0 0.2-0.1v-21.1c0-2.3 2.8-3.6 5.1-4.1 0.7-2.2 2-3.9 4-5.5 0.3-0.3 0.2-0.7-0.1-0.7"
              ></path>
              <path
                className="fill-foreground"
                d="m34.6 29.4c0 0.1 0 0.1-0.1 0.2 0 0.1-0.1 0.1-0.2 0.1h-11.8v-2.1c0-2.9 3.5-4.3 6.2-4.3 2.6 0 5.9 1.4 5.9 4.3v1.8zm-5.9-12.6c-6.1 0.1-12.8 3.6-12.8 10.7v10.8c0 7.2 6.7 10.6 12.8 10.7 4.4 0 9.3-1.8 11.7-5.7 0.1-0.1 0-0.3-0.1-0.4-2.1-1.2-3.3-1.9-5.4-3-0.1 0-0.1 0-0.2 0.1-1.1 1.9-4 2.9-6 2.9-2.7 0-6.2-1.7-6.2-4.6v-3.2h16.9c0.9 0 1.6-0.7 1.6-1.6v-5.9c0-7.2-6.3-10.7-12.3-10.8"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold font-mono tracking-wide">AI Boilerplate</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Build your custom eToro portfolio management application with in-house services and
            reusable UI building blocks.
          </p>
        </div>

        <section className="grid w-full gap-4 md:grid-cols-3">
          <Card className="relative w-full max-w-sm overflow-hidden pt-0">
            <div className="pt-4 h-24">
              <BarChartMultiVertical />
            </div>
            <CardHeader>
              <CardTitle>See available eToro data</CardTitle>
              <CardDescription>
                Browse our market data, Pro Investor universe, trading information, and much more -
                currently exposed by the eToro API.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <TransitionLink href="/services" className="w-full">
                <Button className="w-full" variant="secondary">
                  View available data
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} className="ml-1" />
                </Button>
              </TransitionLink>
            </CardFooter>
          </Card>

          <Card className="relative w-full max-w-sm overflow-hidden pt-0">
            <div className="relative h-24 w-full overflow-hidden">
              <div className="bg-primary absolute inset-0 z-30 opacity-50 dark:opacity-0 mix-blend-color" />
              <img
                src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Photo by mymind on Unsplash"
                title="Photo by mymind on Unsplash"
                className="hero-image-drift relative z-20 w-full object-cover brightness-70 dark:brightness-25 grayscale"
              />
            </div>
            <CardHeader>
              <CardTitle>See available app functionalities</CardTitle>
              <CardDescription>
                Explore product-ready capabilities in plain language, such as alerts, workflows, and
                automations.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <TransitionLink href="/funcionalities" className="w-full">
                <Button className="w-full" variant="secondary">
                  View functionalities
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} className="ml-1" />
                </Button>
              </TransitionLink>
            </CardFooter>
          </Card>

          <Dialog>
            <Card className="relative w-full max-w-sm overflow-hidden pt-0">
              <div className="px-4 pt-6 h-24">
                <BarChartBreakdown />
              </div>
              <CardHeader className="">
                <CardTitle>Start building</CardTitle>
                <CardDescription>
                  Start from a pre-built chart and turn it into workflows, alerts, and automations.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <DialogTrigger render={<Button className="w-full" variant="secondary" />}>
                  Start Building{" "}
                  <HugeiconsIcon icon={BubbleChatQuestionIcon} size={18} className="ml-1" />
                </DialogTrigger>
              </CardFooter>
            </Card>

            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ideas to start quickly</DialogTitle>
                <DialogDescription>
                  Pick one workflow and ship a first version today. These are non-technical examples
                  you can customize.
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
        </section>

        <p className="text-muted-foreground text-sm mt-10">Built with 💚 by eToro</p>
      </main>
    </div>
  );
}
