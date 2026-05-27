"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-medium text-accent">Something went wrong</p>
      <h1 className="mt-3 text-4xl font-medium">
        The page failed to load.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        Try again. If the issue continues, email the brief directly.
      </p>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </Container>
  );
}
