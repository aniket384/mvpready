import Link from "next/link";
import { headingId } from "@/lib/blog/posts";

type MdxComponentProps = {
  children?: React.ReactNode;
  href?: string;
};

type MDXComponents = Record<string, React.ComponentType<MdxComponentProps>>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2
        id={headingId(String(children))}
        className="mt-12 scroll-mt-28 text-3xl font-medium"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-2xl font-medium">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mt-4 text-base leading-8 text-muted-foreground">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">{children}</ul>
    ),
    a: ({ href = "", children }) => (
      <Link href={href} className="font-medium text-foreground underline">
        {children}
      </Link>
    ),
    ...components,
  };
}
