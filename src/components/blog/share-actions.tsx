"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useState } from "react";

export function ShareActions({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }

      await copyLink();
    } catch {
      // Native share can be dismissed by the reader without affecting the page.
    }
  }

  return (
    <div className="flex gap-2" aria-label="Share this article">
      <button
        type="button"
        onClick={share}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied ? <Check className="h-4 w-4 text-accent" /> : <Link2 className="h-4 w-4" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
