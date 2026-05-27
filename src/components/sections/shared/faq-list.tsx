type FaqListProps = {
  faqs: {
    question: string;
    answer: string;
  }[];
};

export function FaqList({ faqs }: FaqListProps) {
  return (
    <div className="divide-y divide-border rounded-lg border border-border bg-background">
      {faqs.map((faq) => (
        <details key={faq.question} className="group p-6 transition-colors hover:bg-muted/30">
          <summary className="cursor-pointer list-none text-base font-medium marker:hidden">
            <span className="flex items-center justify-between gap-4">
              {faq.question}
              <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
