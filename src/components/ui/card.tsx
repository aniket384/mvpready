import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm shadow-black/[0.02] transition-[background-color,border-color,box-shadow] duration-200 ease-out hover:border-foreground/20 hover:bg-muted/35 hover:shadow-md hover:shadow-black/[0.04] dark:shadow-black/20 dark:hover:shadow-black/30 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
