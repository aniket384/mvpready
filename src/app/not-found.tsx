import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="text-sm font-medium text-accent">Page not found</p>
      <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-medium leading-tight sm:text-5xl">
        This page is not part of the current MVPReady site.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted-foreground">
        The best next step is to review the MVP strategy sprint, explore the
        founder guides, or contact MVPReady with the product you are building.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/audit" size="lg">
          Plan the MVP
          <ArrowRight size={17} />
        </ButtonLink>
        <ButtonLink href="/blog" size="lg" variant="secondary">
          Read founder guides
        </ButtonLink>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        <Link href="/" className="underline underline-offset-4 hover:text-foreground">
          Return home
        </Link>
      </p>
    </Container>
  );
}
