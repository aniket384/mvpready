import { FaqList } from "@/components/sections/shared/faq-list";

export function ArticleFaq({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return <FaqList faqs={faqs} />;
}
