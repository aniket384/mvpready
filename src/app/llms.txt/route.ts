import { getLlmsText } from "@/lib/seo/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(
    getLlmsText(),
    {
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    },
  );
}
