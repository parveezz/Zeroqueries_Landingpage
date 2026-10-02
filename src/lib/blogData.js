export const BLOG_POSTS = [
  {
    slug: "why-natural-language",
    title: "Why natural language is the future of analytics",
    excerpt: "Every dashboard you build today is a question someone forgot to ask. Here's how ZeroQueries flips the model — you ask, the data answers.",
    category: "Product",
    author: "Aarav Mehta",
    authorRole: "Head of Product",
    date: "2026-10-02",
    readTime: "8 min read",
    image: null,
    content: [
      "Every dashboard built today answers a question that was relevant yesterday. By the time a data engineer writes the ETL pipeline, builds the DBT models, and designs the Tableau or Looker board, the business reality has shifted.",
      "Traditional BI fails not because of bad charts, but because of rigid questions. Decision-makers don't think in SQL queries; they think in hypotheses, edge cases, and causal relationships.",
      "With generative AI and schema-aware semantic layers, ZeroQueries translates plain English into verified, production-grade warehouse queries in sub-second response times. You don't wait three weeks for a dashboard update — you simply ask, verify the query lineage, and act immediately."
    ],
  },
  {
    slug: "how-we-built-query-translation",
    title: "How we built real-time query translation",
    excerpt: "A look under the hood at how ZeroQueries converts plain English into SQL with sub-second response times.",
    category: "Engineering",
    author: "Priya Nair",
    authorRole: "Staff Engineer",
    date: "2026-09-24",
    readTime: "12 min read",
    image: null,
    content: [
      "Natural language to SQL has been a holy grail for decades, but early LLM approaches failed miserably in enterprise deployments because hallucinations on financial or operational data are catastrophic.",
      "At ZeroQueries, we developed a dual-phase translation engine. Phase 1 performs intent extraction and resolves ambiguous business entities against your catalog. Phase 2 validates AST constraints and simulates query execution against metadata schemas before touching your actual database.",
      "This ensures zero query leakage, strict permission inheritance, and sub-second execution without duplicating a single row of underlying warehouse data."
    ],
  },
  {
    slug: "soc2-hipaa-enterprise-buyers",
    title: "SOC 2, HIPAA, and what enterprise buyers actually ask",
    excerpt: "A no-nonsense guide to compliance questions we hear from procurement teams — and how ZeroQueries answers them.",
    category: "Security",
    author: "Marcus Elkins",
    authorRole: "VP of Security",
    date: "2026-09-18",
    readTime: "10 min read",
    image: null,
    content: [
      "Enterprise security reviews are no longer checkbox exercises. When CISOs evaluate AI data tools, their first question is: 'Will our proprietary data be used to train external models?'",
      "The answer with ZeroQueries is an unequivocal NO. We enforce strict data tenancy, zero model training on customer payloads, and end-to-end TLS 1.3 encryption with KMS customer-managed keys.",
      "Whether you are handling HIPAA-regulated PHI or financial telemetry under SOC 2 Type II controls, ZeroQueries operates with read-only scoped credentials and comprehensive audit logging."
    ],
  },
  {
    slug: "connecting-snowflake",
    title: "Connecting Snowflake to natural language queries",
    excerpt: "A step-by-step walkthrough — connect your Snowflake warehouse to ZeroQueries and run your first query in under 15 minutes.",
    category: "Tutorial",
    author: "Sofia Reyes",
    authorRole: "Solutions Engineer",
    date: "2026-09-10",
    readTime: "6 min read",
    image: null,
    content: [
      "Setting up ZeroQueries with Snowflake takes less than 15 minutes and requires zero migration or ETL pipelines.",
      "Step 1: Create a dedicated read-only role with warehouse usage permissions. Step 2: Input your Snowflake account identifier and credentials in the ZeroQueries workspace. Step 3: Our schema crawler automatically maps relationships and semantic tags.",
      "Within seconds, your team can ask natural language questions like 'Show me regional revenue variance week-over-week' and inspect the generated SQL alongside interactive visual outputs."
    ],
  },
  {
    slug: "why-bi-dashboards-go-stale",
    title: "Why BI dashboards keep going stale",
    excerpt: "The average enterprise dashboard is 3 weeks out of date by the time it's opened. Here's what to do about it.",
    category: "Insights",
    author: "Aarav Mehta",
    authorRole: "Head of Product",
    date: "2026-09-03",
    readTime: "9 min read",
    image: null,
    content: [
      "Gartner reports that over 70% of enterprise dashboards are abandoned within 90 days of creation. The culprit isn't visual aesthetics — it's the latency between asking a new question and getting an updated view.",
      "When business leaders must submit a Jira ticket to data engineering every time a new dimension needs exploring, momentum dies. Modern decision-making demands interactive, on-the-fly intelligence.",
      "Replacing static dashboards with agentic, conversational interfaces allows operators to interrogate the underlying data continuously without burdening data engineering teams."
    ],
  },
  {
    slug: "introducing-agentic-apps",
    title: "Introducing Agentic Apps",
    excerpt: "Ship self-service data tools that run automatically — no dashboards, no manual refresh, no waiting on the data team.",
    category: "Product",
    author: "Priya Nair",
    authorRole: "Staff Engineer",
    date: "2026-08-27",
    readTime: "7 min read",
    image: null,
    content: [
      "We are thrilled to unveil Agentic Apps — autonomous, purpose-built analytics workflows that monitor your business metrics 24/7.",
      "Instead of a human logging in to check anomaly spikes, an Agentic App monitors real-time sales pipeline drops, triggers diagnostic queries across product lines, and compiles executive summaries directly into Slack or your email inbox.",
      "This transforms analytics from reactive observation to proactive, automated decision execution."
    ],
  },
  {
    slug: "cost-of-slow-data",
    title: "The real cost of slow data access",
    excerpt: "Data-driven companies are 23× more likely to acquire customers. Yet most orgs still wait days for a simple report.",
    category: "Insights",
    author: "Marcus Elkins",
    authorRole: "VP of Security",
    date: "2026-08-19",
    readTime: "5 min read",
    image: null,
    content: [
      "Speed is the ultimate competitive moat. When marketing, sales, and operations teams can validate assumptions in seconds, they run 10x more experiments and course-correct before rivals even notice a shift in the market.",
      "The hidden cost of slow data isn't just wasted analyst hours — it's the missed revenue opportunities from deals that stalled while waiting for inventory or pipeline clarity.",
      "Eliminating query lag turns analytics into a real-time revenue driver rather than a back-office reporting cost center."
    ],
  },
];

export async function getAllPosts() {
  return BLOG_POSTS;
}

export async function getPostBySlug(slug) {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim();
  return (
    BLOG_POSTS.find(
      (p) =>
        p.slug.toLowerCase() === normalized ||
        p.slug.toLowerCase().replace(/-/g, "") === normalized.replace(/-/g, "")
    ) || null
  );
}
