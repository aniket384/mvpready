export function ArticleCallout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-8 rounded-lg border border-border bg-muted/40 p-5 text-sm leading-7 text-muted-foreground">
      {children}
    </aside>
  );
}
