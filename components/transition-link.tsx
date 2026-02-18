"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type TransitionLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

export function TransitionLink({ href, children, className }: TransitionLinkProps) {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const currentPath = window.location.pathname + window.location.search + window.location.hash;
    if (currentPath === href) return;

    event.preventDefault();

    const doc = document as ViewTransitionDocument;
    if (!doc.startViewTransition) {
      router.push(href);
      return;
    }

    doc.startViewTransition(() => {
      router.push(href);
    });
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
