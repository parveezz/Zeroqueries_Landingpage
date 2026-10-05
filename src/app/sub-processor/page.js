import LegalPage from "@/Components/LegalPage";

export const metadata = {
    title: "Authorized Sub-Processors | ZeroQueries",
    description:
        "The third-party sub-processors ZeroQueries engages to deliver secure cloud infrastructure, AI model execution, and messaging integrations.",
    alternates: {
        canonical: "/sub-processors",
    },
};

const SECTIONS = [
    { id: "overview", title: "Overview" },
    { id: "sub-processors", title: "Authorized Sub-Processors" },
    { id: "zero-persistence", title: "Zero Data Persistence" },
    { id: "dpa", title: "Data Processing Agreement" },
    { id: "changes", title: "Changes to This List" },
    { id: "contact", title: "Contact" },
];

export default function SubProcessorsPage() {
    return (
        <LegalPage
            title="Authorized Sub-Processors"
            subtitle="The third-party services ZeroQueries engages to operate its platform, and the safeguards that apply to each."
            lastUpdated="October 2, 2026"
            version="1.2"
            sections={SECTIONS}
        >
            <h2 id="overview">Overview</h2>
            <p>
                ZeroQueries engages a limited number of third-party sub-processors to
                maintain secure cloud infrastructure, execute AI model inference, and
                power messaging integrations such as WhatsApp and Slack. Each
                sub-processor is subject to a written data processing agreement and is
                evaluated against GDPR, SOC 2, and ISO 27001 standards before being
                onboarded.
            </p>
            <p>
                This page lists every sub-processor currently authorized by
                ZeroQueries. It is updated whenever a new sub-processor is added or an
                existing one is removed.
            </p>

            <h2 id="sub-processors">Authorized Sub-Processors</h2>

            <h3>OpenAI LLC</h3>
            <ul>
                <li>
                    <strong>Purpose</strong> — Large Language Model (LLM) processing and
                    AI inference (OpenAI GPT-4.1 nano, GPT-4o).
                </li>
                <li>
                    <strong>Processing location</strong> — United States.
                </li>
                <li>
                    <strong>Data processed</strong> — User-submitted natural language
                    questions and any metadata required to answer them. Customer database
                    records are not transmitted to OpenAI.
                </li>
                <li>
                    <strong>Safeguards</strong> — Zero data retention configuration,
                    contractual prohibition on model training, encrypted transit (TLS
                    1.3).
                </li>
            </ul>

            <h3>DigitalOcean Cloud (DigitalOcean, LLC)</h3>
            <ul>
                <li>
                    <strong>Purpose</strong> — Cloud droplet infrastructure and
                    application hosting.
                </li>
                <li>
                    <strong>Processing location</strong> — United States and European
                    Union data centers.
                </li>
                <li>
                    <strong>Data processed</strong> — Application workloads, service
                    logs, and encrypted configuration. No persistent customer data is
                    stored on DigitalOcean infrastructure.
                </li>
                <li>
                    <strong>Safeguards</strong> — SOC 2 Type II, ISO 27001, encrypted
                    volumes (AES-256), private networking.
                </li>
            </ul>

            <h3>Meta Platforms, Inc. (WhatsApp Business API)</h3>
            <ul>
                <li>
                    <strong>Purpose</strong> — WhatsApp Business messaging channel for
                    user-submitted questions and answers.
                </li>
                <li>
                    <strong>Processing location</strong> — Global (per Meta
                    infrastructure).
                </li>
                <li>
                    <strong>Data processed</strong> — Message content and phone number
                    for active sessions. Messages are not retained after the session
                    ends.
                </li>
                <li>
                    <strong>Safeguards</strong> — End-to-end encrypted transport,
                    WhatsApp Business Terms, EU Standard Contractual Clauses where
                    applicable.
                </li>
            </ul>

            <h3>Salesforce, Inc. (Slack)</h3>
            <ul>
                <li>
                    <strong>Purpose</strong> — Slack workspace integration for
                    user-submitted queries via slash commands and app mentions.
                </li>
                <li>
                    <strong>Processing location</strong> — United States and EU
                    regions.
                </li>
                <li>
                    <strong>Data processed</strong> — Message content and workspace
                    identifiers for active sessions. No persistent storage.
                </li>
                <li>
                    <strong>Safeguards</strong> — SOC 2 Type II, ISO 27001, Slack
                    Enterprise Grid compliance options.
                </li>
            </ul>

            <h3>Amazon Web Services, Inc. (AWS)</h3>
            <ul>
                <li>
                    <strong>Purpose</strong> — Content delivery, object storage for
                    non-customer operational assets, and CDN.
                </li>
                <li>
                    <strong>Processing location</strong> — US-East, EU-Central, and
                    regional edge locations.
                </li>
                <li>
                    <strong>Data processed</strong> — Static application assets and
                    encrypted infrastructure backups. Customer database records are
                    never transmitted to AWS.
                </li>
                <li>
                    <strong>Safeguards</strong> — SOC 2, ISO 27001, HIPAA BAA, AES-256
                    at rest, TLS 1.3 in transit.
                </li>
            </ul>

            <h3>Stripe, Inc.</h3>
            <ul>
                <li>
                    <strong>Purpose</strong> — Payment processing and subscription
                    billing.
                </li>
                <li>
                    <strong>Processing location</strong> — United States and European
                    Union.
                </li>
                <li>
                    <strong>Data processed</strong> — Customer billing information,
                    organization name, and contact email.
                </li>
                <li>
                    <strong>Safeguards</strong> — PCI DSS Level 1, SOC 2 Type II,
                    tokenized card handling.
                </li>
            </ul>

            <h3>Functional Software, Inc. (Sentry)</h3>
            <ul>
                <li>
                    <strong>Purpose</strong> — Application error monitoring and
                    performance diagnostics.
                </li>
                <li>
                    <strong>Processing location</strong> — United States and European
                    Union.
                </li>
                <li>
                    <strong>Data processed</strong> — Error stack traces and diagnostic
                    metadata. Sentry is configured to strip personally identifiable
                    information and customer data before transmission.
                </li>
                <li>
                    <strong>Safeguards</strong> — SOC 2 Type II, GDPR-compliant data
                    processing agreement.
                </li>
            </ul>

            <h2 id="zero-persistence">Zero Data Persistence</h2>
            <p>
                <strong>
                    ZeroQueries enforces a strict zero data persistence policy across its
                    AI sub-processors.
                </strong>{" "}
                Customer database records queried through ZeroQueries are never saved,
                cached, or used to train any third-party AI model. All query results
                are processed in memory and discarded when the session ends.
            </p>
            <ul>
                <li>
                    OpenAI is configured with <strong>zero data retention</strong> for
                    all ZeroQueries requests.
                </li>
                <li>
                    Query results are never transmitted to OpenAI — only the natural
                    language question itself.
                </li>
                <li>
                    Messaging integrations (WhatsApp, Slack) do not persist message
                    content beyond the active session.
                </li>
                <li>
                    Diagnostic tools (Sentry) are configured to strip PII and customer
                    data at the source.
                </li>
            </ul>
            <p>
                For more details, see our{" "}
                <a href="/security">Security &amp; Compliance</a> page.
            </p>

            <h2 id="dpa">Data Processing Agreement</h2>
            <p>
                Enterprise customers may request a Data Processing Agreement (DPA) that
                includes the current list of sub-processors, the categories of personal
                data processed, and the safeguards applied to each transfer.
            </p>
            <p>
                DPAs are available for signature in English and are aligned with GDPR
                Article 28 requirements. Standard Contractual Clauses (SCCs) are
                included for cross-border transfers.
            </p>
            <p>
                To request a DPA, email{" "}
                <a href="mailto:support@zeroqueries.com">
                    support@zeroqueries.com
                </a>{" "}
                with your organization name and the name of the signatory.
            </p>

            <h2 id="changes">Changes to This List</h2>
            <p>
                ZeroQueries updates this page before engaging any new sub-processor.
                Enterprise customers who have signed a DPA will receive written notice
                at least <strong>30 days</strong> in advance of any new sub-processor
                being authorized, in accordance with the terms of the DPA.
            </p>
            <p>
                The <em>Last updated</em> date at the top of this page always reflects
                the most recent change.
            </p>

            <h2 id="contact">Contact</h2>
            <p>
                Questions about our sub-processors, data flows, or a DPA request?
                Reach us at{" "}
                <a href="mailto:support@zeroqueries.com">
                    support@zeroqueries.com
                </a>.
            </p>
            <p>
                Invertio Software Solutions
                <br />
                HITEC City, Madhapur
                <br />
                Hyderabad, Telangana 500081, India
            </p>
        </LegalPage>
    );
}