import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-md border border-border bg-background px-3 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-accent",
        props.className,
      )}
    />
  );
}
