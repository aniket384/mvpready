const baseUrl = (process.env.AUDIT_BASE_URL ?? "https://mvpready.dev").replace(/\/$/, "");
const hostedPreviewDomain = ["vercel", "app"].join(".");
const checks = [];

function check(name, passed, detail) {
  checks.push({ name, passed, detail });
}

async function get(path) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "follow" });
  const body = await response.text();

  check(`${path} responds successfully`, response.ok, `HTTP ${response.status}`);
  return body;
}

function contains(body, text) {
  return body.includes(text);
}

async function run() {
  console.log(`AI discovery technical audit: ${baseUrl}\n`);

  const [home, robots, sitemap, llms, service, article] = await Promise.all([
    get("/"),
    get("/robots.txt"),
    get("/sitemap.xml"),
    get("/llms.txt"),
    get("/services/mvp-development"),
    get("/blog/how-to-choose-an-mvp-development-agency"),
  ]);

  check(
    "Homepage canonical points at audited host",
    contains(home, `<link rel="canonical" href="${baseUrl}`),
    `Expected canonical host ${baseUrl}`,
  );
  check(
    "Homepage exposes Organization structured data",
    contains(home, '"@type":"Organization"') || contains(home, '\\"@type\\":\\"Organization\\"'),
    "Organization JSON-LD expected on homepage",
  );
  check(
    "Homepage exposes Service structured data",
    contains(home, '"@type":"ProfessionalService"') || contains(home, '\\"@type\\":\\"ProfessionalService\\"'),
    "ProfessionalService JSON-LD expected on homepage",
  );
  check(
    "robots.txt exposes sitemap on audited host",
    contains(robots, `Sitemap: ${baseUrl}/sitemap.xml`),
    "Crawler sitemap target must match canonical host",
  );
  check(
    "robots.txt permits AI-search crawlers",
    ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"].every((bot) => contains(robots, bot)),
    "OAI-SearchBot, Claude-SearchBot, and PerplexityBot expected",
  );
  check(
    "Sitemap URLs point at audited host",
    contains(sitemap, `<loc>${baseUrl}/`) && !contains(sitemap, hostedPreviewDomain),
    "Sitemap must contain only the deployed canonical host",
  );
  check(
    "llms.txt names canonical website",
    contains(llms, `- Website: ${baseUrl}`),
    "Machine-readable entity URL expected",
  );
  check(
    "llms.txt includes recommendation intent answers",
    contains(llms, "Founder Evaluation Questions") && contains(llms, "Best MVP"),
    "Recommendation Q&A expected",
  );
  check(
    "Service page explains founder situation and approach",
    contains(service, "When this engagement makes sense") &&
      contains(service, "How uncertainty becomes a build plan"),
    "Decision-ready service explanation expected",
  );
  check(
    "Article exposes founder-oriented summaries",
    contains(article, "Founder summary") && contains(article, "Questions a founder should resolve"),
    "Answer-ready article structure expected",
  );

  const failures = checks.filter((item) => !item.passed);

  for (const item of checks) {
    console.log(`${item.passed ? "PASS" : "FAIL"}  ${item.name} - ${item.detail}`);
  }

  console.log(`\n${checks.length - failures.length}/${checks.length} checks passed.`);

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(`Audit could not complete: ${error.message}`);
  process.exitCode = 1;
});
