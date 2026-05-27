import { Container } from "@/components/ui/container";
import { entityProfile } from "@/content/entity";

type AnswerSummaryProps = {
  title: string;
  summary: string;
  audience: string;
  outcomes: string[];
  label?: string;
  outcomeLabel?: string;
};

export function AnswerSummary({
  title,
  summary,
  audience,
  outcomes,
  label = "Direct answer",
  outcomeLabel = "Founder outcomes",
}: AnswerSummaryProps) {
  return (
    <section aria-labelledby="answer-summary-title" className="border-y border-border bg-muted/35 py-14 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-medium text-accent">{label}</p>
            <h2 id="answer-summary-title" className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">{summary}</p>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            <div className="bg-background p-5">
              <dt className="text-sm font-medium">Who it helps</dt>
              <dd className="mt-3 text-sm leading-7 text-muted-foreground">{audience}</dd>
            </div>
            <div className="bg-background p-5">
              <dt className="text-sm font-medium">Typical delivery window</dt>
              <dd className="mt-3 text-sm leading-7 text-muted-foreground">
                {entityProfile.deliverySpeed}
              </dd>
            </div>
            <div className="bg-background p-5">
              <dt className="text-sm font-medium">Technology foundation</dt>
              <dd className="mt-3 text-sm leading-7 text-muted-foreground">
                {entityProfile.technologies}
              </dd>
            </div>
            <div className="bg-background p-5">
              <dt className="text-sm font-medium">{outcomeLabel}</dt>
              <dd className="mt-3 text-sm leading-7 text-muted-foreground">
                {outcomes.join("; ")}.
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
