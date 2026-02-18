import Link from "next/link";
import { UiComponentsPlayground } from "@/components/ui-components-playground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UiComponentsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <p className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          {" / "}
          <span className="text-foreground">UI Components</span>
        </p>
        <h1 className="text-primary text-3xl font-bold">UI Components Playground</h1>
        <p className="max-w-2xl text-muted-foreground">
          Render and interact with real components from `components/ui` to validate behavior and
          visual consistency.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Live Component Preview</CardTitle>
          <CardDescription>These are mounted components, not static placeholders.</CardDescription>
        </CardHeader>
        <CardContent>
          <UiComponentsPlayground />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Link href="/playground">
          <Button>Open eToro Services Playground</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}
