import LegalPage from "@/Components/Shared/LegalPage";

export const metadata = {
  title: "Cookie Policy & Preferences | ZeroQueries",
  description:
    "Understand the cookies and local storage technologies used by ZeroQueries to ensure session security and optimal platform performance.",
};

const SECTIONS = [
  { id: "what-are-cookies", title: "1. What Are Cookies" },
  { id: "categories", title: "2. Categories of Cookies We Use" },
  { id: "essential-cookies", title: "3. Strictly Necessary Cookies" },
  { id: "functional-cookies", title: "4. Functional & Performance Cookies" },
  { id: "analytics-cookies", title: "5. Analytics Cookies" },
  { id: "managing-preferences", title: "6. Managing Your Cookie Preferences" },
  { id: "updates", title: "7. Policy Updates & Inquiries" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Preferences &amp; Policy"
      subtitle="How ZeroQueries uses cookies and modern web storage to protect your account and deliver a responsive analytics workspace."
      lastUpdated="October 2, 2026"
      version="3.0"
      sections={SECTIONS}
    >
      <h2 id="what-are-cookies">1. What Are Cookies</h2>
      <p>
        Cookies are small text files placed on your device by websites you visit. They are widely used to make web
        applications function securely, remember your user preferences, and provide aggregated analytics to site
        operators without identifying specific individuals.
      </p>

      <h2 id="categories">2. Categories of Cookies We Use</h2>
      <p>
        ZeroQueries maintains a privacy-centric approach to browser tracking. We categorize the cookies utilized on our
        platform and documentation hubs into three distinct tiers:
      </p>
      <ul>
        <li><strong>Strictly Necessary:</strong> Essential for authentication, CSRF defense, and session persistence.</li>
        <li><strong>Functional &amp; Preference:</strong> Remembers your active theme, language preferences, and interface layouts.</li>
        <li><strong>Performance &amp; Analytics:</strong> Aggregated, anonymized telemetry tracking feature adoption and platform latency.</li>
      </ul>

      <h2 id="essential-cookies">3. Strictly Necessary Cookies</h2>
      <p>
        These cookies are indispensable for the core operation of our web workspace and cannot be disabled in our systems.
        They are established in response to actions performed by you, such as logging into your organization&rsquo;s tenant,
        setting privacy preferences, or authenticating via Single Sign-On tokens.
      </p>

      <h2 id="functional-cookies">4. Functional &amp; Performance Cookies</h2>
      <p>
        Functional cookies enable enhanced interface personalization, such as remembering your collapsed sidebar states,
        chart color configurations, and default SQL dialect filters. If you disable these cookies, some features may not
        remember your previous preferences between browser sessions.
      </p>

      <h2 id="analytics-cookies">5. Analytics Cookies</h2>
      <p>
        We utilize self-hosted or privacy-focused analytics services with IP anonymization to evaluate aggregate traffic
        trends and detect API latency bottlenecks. <strong>We do not deploy third-party advertising tracking cookies,
        retargeting pixels, or behavioral advertising brokers on our platform.</strong>
      </p>

      <h2 id="managing-preferences">6. Managing Your Cookie Preferences</h2>
      <p>
        You can configure your browser to block or alert you about all cookies, or clear previously stored cookies at
        any time through your browser settings:
      </p>
      <ul>
        <li>Google Chrome: Settings &rarr; Privacy and security &rarr; Cookies and other site data</li>
        <li>Mozilla Firefox: Settings &rarr; Privacy &amp; Security &rarr; Enhanced Tracking Protection</li>
        <li>Apple Safari: Preferences &rarr; Privacy &rarr; Manage Website Data</li>
        <li>Microsoft Edge: Settings &rarr; Cookies and site permissions</li>
      </ul>

      <h2 id="updates">7. Policy Updates &amp; Inquiries</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect modifications in regulatory frameworks or technical
        standards. For questions regarding our cookie practices, reach out to:
      </p>
      <ul>
        <li>Privacy Team: <a href="mailto:privacy@zeroqueries.com">privacy@zeroqueries.com</a></li>
      </ul>
    </LegalPage>
  );
}
