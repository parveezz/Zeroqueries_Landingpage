import LegalPage from "@/Components/LegalPage";

export const metadata = {
  title: "Terms of Service | ZeroQueries",
  description:
    "The terms that govern your access to and use of ZeroQueries.",
};

const SECTIONS = [
  { id: "agreement", title: "1. Agreement to Terms" },
  { id: "accounts", title: "2. Accounts" },
  { id: "acceptable-use", title: "3. Acceptable Use" },
  { id: "customer-content", title: "4. Customer Content" },
  { id: "ip", title: "5. Intellectual Property" },
  { id: "fees", title: "6. Fees and Payment" },
  { id: "termination", title: "7. Termination" },
  { id: "disclaimers", title: "8. Disclaimers" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "indemnification", title: "10. Indemnification" },
  { id: "governing-law", title: "11. Governing Law" },
  { id: "changes", title: "12. Changes to Terms" },
  { id: "contact", title: "13. Contact" },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The terms that govern your access to and use of ZeroQueries."
      lastUpdated="October 2, 2026"
      version="2.4"
      sections={SECTIONS}
    >
      <h2 id="agreement">1. Agreement to Terms</h2>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use
        of ZeroQueries and any related services provided by{" "}
        <strong>Invertio Software Solutions</strong>. By accessing or using the
        Services, you agree to be bound by these Terms and our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
      <p>
        If you are entering into these Terms on behalf of an organization, you
        represent that you have authority to bind that organization.
      </p>

      <h2 id="accounts">2. Accounts</h2>
      <p>
        You must be at least 16 years old to create an account. You are
        responsible for:
      </p>
      <ul>
        <li>Maintaining the confidentiality of your account credentials.</li>
        <li>All activity that occurs under your account.</li>
        <li>Promptly notifying us of any unauthorized use.</li>
      </ul>
      <p>
        We reserve the right to suspend accounts that violate these Terms or
        that we reasonably believe are being used fraudulently.
      </p>

      <h2 id="acceptable-use">3. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Services to violate any applicable law or regulation.</li>
        <li>Attempt to gain unauthorized access to any system or network.</li>
        <li>Reverse engineer, decompile, or disassemble any part of the Services.</li>
        <li>Interfere with or disrupt the integrity or performance of the Services.</li>
        <li>Upload malicious code or content that infringes third-party rights.</li>
        <li>Use the Services to build a competing product.</li>
        <li>Resell or sublicense the Services without written permission.</li>
      </ul>

      <h2 id="customer-content">4. Customer Content</h2>
      <p>
        You retain all rights to any content you submit to the Services
        (&quot;Customer Content&quot;). You grant us a limited, worldwide,
        royalty-free license to process Customer Content solely to provide and
        improve the Services.
      </p>
      <p>
        <strong>
          We do not use Customer Content to train machine-learning models.
        </strong>{" "}
        See our <a href="/privacy">Privacy Policy</a> for details.
      </p>

      <h2 id="ip">5. Intellectual Property</h2>
      <p>
        The Services, including all software, design, text, graphics, and the
        ZeroQueries name and logo, are owned by Invertio Software Solutions and
        are protected by intellectual property laws.
      </p>
      <p>
        Except as expressly permitted in writing, you may not copy, modify,
        distribute, sell, or lease any part of the Services.
      </p>

      <h2 id="fees">6. Fees and Payment</h2>
      <p>
        Certain features of the Services require payment. All fees are stated
        in US dollars unless otherwise noted and are non-refundable except as
        required by law or as expressly stated in a signed agreement.
      </p>
      <ul>
        <li>Annual subscriptions are billed in advance.</li>
        <li>Overages are billed monthly in arrears.</li>
        <li>Late payments may result in suspension of access.</li>
      </ul>

      <h2 id="termination">7. Termination</h2>
      <p>
        You may stop using the Services at any time. We may suspend or
        terminate your access if you violate these Terms, if required by law,
        or if we discontinue the Services.
      </p>
      <p>
        Upon termination, your right to use the Services ends immediately. We
        will make Customer Content available for export for 30 days following
        termination, after which it may be deleted.
      </p>

      <h2 id="disclaimers">8. Disclaimers</h2>
      <p>
        The Services are provided <strong>&quot;as is&quot;</strong> without
        warranty of any kind, express or implied, including warranties of
        merchantability, fitness for a particular purpose, and non-infringement.
      </p>
      <p>
        We do not warrant that the Services will be uninterrupted, error-free,
        or completely secure. Answers generated by ZeroQueries are provided for
        informational purposes and should be independently verified before
        making business decisions.
      </p>

      <h2 id="liability">9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Invertio Software Solutions
        shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages, including lost profits, lost
        revenue, lost data, or business interruption, arising from your use of
        the Services.
      </p>
      <p>
        Our total aggregate liability shall not exceed the amount you paid us
        in the twelve months preceding the claim.
      </p>

      <h2 id="indemnification">10. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Invertio Software Solutions
        and its officers, employees, and agents from any claims, damages,
        losses, or expenses arising from your use of the Services or your
        violation of these Terms.
      </p>

      <h2 id="governing-law">11. Governing Law</h2>
      <p>
        These Terms are governed by the laws of <strong>India</strong>, without
        regard to its conflict of laws principles. Any dispute shall be
        resolved exclusively in the courts located in{" "}
        <strong>Hyderabad, Telangana</strong>.
      </p>

      <h2 id="changes">12. Changes to Terms</h2>
      <p>
        We may modify these Terms at any time. If we make material changes, we
        will notify you at least 30 days in advance by email or through the
        Services. Continued use of the Services after changes take effect
        constitutes acceptance of the revised Terms.
      </p>

      <h2 id="contact">13. Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href="mailto:legal@zeroqueries.com">legal@zeroqueries.com</a>.
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
