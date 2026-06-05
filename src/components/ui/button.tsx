import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium shadow-sm shadow-black/0 transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:-translate-y-px hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/5",
        secondary:
          "border border-border bg-background text-foreground hover:-translate-y-px hover:border-foreground/20 hover:bg-muted",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "h-auto p-0 text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-5",
        lg: "h-13 px-6 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

type ButtonLinkProps = VariantProps<typeof buttonVariants> & {
  href: string;
  children: React.ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  children,
  rel,
  target,
  ...props
}: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href);
  const safeRel = target === "_blank" || isExternal ? rel ?? "noopener noreferrer" : rel;

  if (isExternal) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={safeRel}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </Link>
  );
}
