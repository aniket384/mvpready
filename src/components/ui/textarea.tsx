import { cn } from "@/lib/utils";

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-32 w-full rounded-md border border-border bg-background px-3 py-3 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-60",
        props.className,
      )}
    />
  );
}
