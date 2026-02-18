import { ComponentExample } from "@/components/component-example";
import Link from "next/link";

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to eToro Boilerplate
          </Link>
        </div>
      </header>
      <ComponentExample />
    </div>
  );
}
