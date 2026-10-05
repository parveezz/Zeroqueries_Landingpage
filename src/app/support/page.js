import LegalPage from "@/Components/LegalPage";

export const metadata = {
  title: "Security & Compliance | ZeroQueries",
  description:
    "How ZeroQueries keeps your data secure — encryption, compliance, and enterprise controls.",
};

const SECTIONS = [
  { id: "security-model", title: "Our Security Model" },
  { id: "data-protection", title: "Data Protection" },
  { id: "access-controls", title: "Access Controls" },
  { id: "compliance", title: "Compliance & Certifications" },
  { id: "deployment", title: "Deployment Options" },
  { id: "infrastructure", title: "Infrastructure" },
  { id: "incident-response", title: "Incident Response" },
  { id: "disclosure", title: "Responsible Disclosure" },
  { id: "documents", title: "Request Documents" },
];

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security & Compliance"
      subtitle="How we protect your data, meet enterprise standards, and stay audit-ready."
      lastUpdated="October 2, 2026"
      version="1.6"
      sections={SECTIONS}
    >
      <h2 id="security-model">Our Security Model</h2>
      <p>
        ZeroQueries is built on a simple principle:{" "}
        <strong>your data never leaves your perimeter.</strong> Queries run
        against read-only connections to your own infrastructure, and results
        are processed in memory without persistent storage.
      </p>
      <p>
        This means we don&apos;t need to store copies of your data, and we can
        offer enterprise-grade guarantees about privacy and retention.
      </p>

      <h2 id="data-protection">Data Protection</h2>
      <ul>
        <li>
          <strong>Encryption at rest</strong> — AES-256 for any data we do
          store (configuration, credentials, audit logs).
        </li>
        <li>
          <strong>Encryption in transit</strong> — TLS 1.3 for all network
          traffic, with forward secrecy.
        </li>
        <li>
          <strong>Customer-managed keys (BYOK)</strong> — Bring your own key
          for enterprise deployments.
        </li>
        <li>
          <strong>Zero-training policy</strong> — Customer data is never used
          to train models.
        </li>
        <li>
          <strong>No persistent storage of query results</strong> — everything
          happens in memory.
        </li>
      </ul>

      <h2 id="access-controls">Access Controls</h2>
      <ul>
        <li>
          <strong>Role-based access control (RBAC)</strong> — granular down to
          table and column level.
        </li>
        <li>
          <strong>SSO and SAML 2.0</strong> — integrate with Okta, Azure AD,
          Google Workspace, and other identity providers.
        </li>
        <li>
          <strong>SCIM provisioning</strong> — automated user lifecycle
          management.
        </li>
        <li>
          <strong>Immutable audit logs</strong> — every user and system action
          is recorded and tamper-proof.
        </li>
        <li>
          <strong>IP allowlisting and device trust</strong> — restrict access
          to trusted networks and managed devices.
        </li>
      </ul>

      <h2 id="compliance">Compliance &amp; Certifications</h2>
      <ul>
        <li>
          <strong>SOC 2 Type II</strong> — Independently audited annually by a
          licensed CPA firm.
        </li>
        <li>
          <strong>HIPAA</strong> — Ready for regulated healthcare workloads;
          Business Associate Agreements available.
        </li>
        <li>
          <strong>GDPR</strong> — Data processing agreements and standard
          contractual clauses available on request.
        </li>
        <li>
          <strong>ISO 27001</strong> — Aligned controls; certification in
          progress.
        </li>
        <li>
          <strong>CCPA</strong> — Compliant handling of California resident
          data.
        </li>
      </ul>

      <h2 id="deployment">Deployment Options</h2>
      <ul>
        <li>
          <strong>Public cloud</strong> — US, EU, Saudi Arabia (KSA), and UAE
          regions.
        </li>
        <li>
          <strong>Private VPC</strong> — deployed inside your AWS, GCP, or
          Azure tenant.
        </li>
        <li>
          <strong>On-premise</strong> — fully air-gapped deployments for the
          most sensitive environments.
        </li>
      </ul>

      <h2 id="infrastructure">Infrastructure</h2>
      <ul>
        <li>Isolated tenant environments — no shared compute.</li>
        <li>Automatic backups with point-in-time recovery.</li>
        <li>Continuous vulnerability scanning and automated patching.</li>
        <li>Annual third-party penetration testing.</li>
        <li>24/7 monitoring with on-call rotation.</li>
      </ul>

      <h2 id="incident-response">Incident Response</h2>
      <p>
        We maintain a documented incident response program with defined
        severity levels, communication protocols, and post-incident review
        processes.
      </p>
      <ul>
        <li>Detection within 15 minutes of abnormal activity.</li>
        <li>Customer notification within 24 hours of confirmed incidents.</li>
        <li>Post-incident reports available to affected customers.</li>
      </ul>

      <h2 id="disclosure">Responsible Disclosure</h2>
      <p>
        If you believe you&apos;ve found a security issue, please email{" "}
        <a href="mailto:security@zeroqueries.com">security@zeroqueries.com</a>.
        We respond to all reports within 24 hours and credit researchers who
        disclose responsibly. Please do not publicly disclose the issue until
        we&apos;ve had an opportunity to review and address it.
      </p>

      <h2 id="documents">Request Documents</h2>
      <p>
        Enterprise customers and prospects under mutual NDA can request access to
        our compliance documentation:
      </p>
      <ul>
        <li>SOC 2 Type II audit report</li>
        <li>HIPAA Business Associate Agreement (BAA)</li>
        <li>Standard Data Processing Agreement (DPA)</li>
        <li>Annual penetration test executive summary</li>
      </ul>
      <p>
        To request these documents, please contact your account representative or
        email{" "}
        <a href="mailto:security@zeroqueries.com">security@zeroqueries.com</a>.
      </p>
    </LegalPage>
  );
}
