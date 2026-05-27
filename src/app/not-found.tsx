import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-3 text-4xl font-medium">
        This page does not exist.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        The page may have moved, or the link may no longer be available.
      </p>
      <ButtonLink href="/" className="mt-8">
        Return home
      </ButtonLink>
    </Container>
  );
}
