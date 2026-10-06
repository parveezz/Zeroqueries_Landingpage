"use client";

import LegalPage from "@/Components/LegalPage";
import { useLanguage } from "@/context/LanguageContext";

const SECTIONS_EN = [
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

const SECTIONS_AR = [
  { id: "security-model", title: "1. نموذج الأمان لدينا" },
  { id: "data-protection", title: "2. حماية البيانات" },
  { id: "access-controls", title: "3. ضوابط الوصول" },
  { id: "compliance", title: "4. الامتثال والشهادات" },
  { id: "deployment", title: "5. خيارات النشر" },
  { id: "infrastructure", title: "6. البنية التحتية" },
  { id: "incident-response", title: "7. الاستجابة للحوادث" },
  { id: "disclosure", title: "8. الإفصاح المسؤول" },
  { id: "documents", title: "9. طلب المستندات" },
];

export default function SecurityPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  if (isAr) {
    return (
      <LegalPage
        title="الأمان والامتثال"
        subtitle="كيف نحمي بياناتك، ونلبي معايير المؤسسات الكبرى، ونبقى جاهزين دائماً لعمليات التدقيق الأمني."
        lastUpdated="2 أكتوبر 2026"
        version="1.6"
        sections={SECTIONS_AR}
      >
        <h2 id="security-model">1. نموذج الأمان لدينا</h2>
        <p>
          تم بناء ZeroQueries على مبدأ بسيط: <strong>بياناتك لا تغادر حدود شبكتك أبداً.</strong> تعمل الاستعلامات عبر اتصالات للقراءة فقط ببنيتك التحتية، وتتم معالجة النتائج في الذاكرة دون تخزين دائم.
        </p>
        <p>
          هذا يعني أننا لسنا بحاجة إلى تخزين نسخ من بياناتك، ويمكننا تقديم ضمانات رفيعة المستوى لخصوصية البيانات والاحتفاظ بها.
        </p>

        <h2 id="data-protection">2. حماية البيانات</h2>
        <ul>
          <li><strong>التشفير أثناء التخزين</strong> — معيار AES-256 لأي بيانات نقوم بتخزينها (الإعدادات، سجلات التدقيق).</li>
          <li><strong>التشفير أثناء النقل</strong> — بروتوكول TLS 1.3 لجميع حركات مرور الشبكة مع ميزة السرية التامة للأمام.</li>
          <li><strong>مفاتيح يديرها العميل (BYOK)</strong> — أحضر مفاتيحك الخاصة لعمليات النشر المؤسسية.</li>
          <li><strong>سياسة عدم تدريب النماذج</strong> — لا تُستخدم بيانات العملاء مطلقاً لتدريب أي نماذج ذكاء اصطناعي.</li>
          <li><strong>لا يوجد تخزين دائم للنتائج</strong> — تتم كافة العمليات داخل الذاكرة العشوائية المؤقتة فقط.</li>
        </ul>

        <h2 id="access-controls">3. ضوابط الوصول</h2>
        <ul>
          <li><strong>التحكم في الوصول القائم على الأدوار (RBAC)</strong> — صلاحيات دقيقة حتى مستوى الجدول والعمود.</li>
          <li><strong>تسجيل الدخول الأحادي (SSO و SAML 2.0)</strong> — تكامل مع Okta و Azure AD و Google Workspace.</li>
          <li><strong>توفير حسابات SCIM</strong> — إدارة مؤتمتة لدورة حياة المستخدمين.</li>
          <li><strong>سجلات تدقيق غير قابلة للتغيير</strong> — يتم تسجيل كل إجراء بدقة لمنع التلاعب.</li>
          <li><strong>القوائم البيضاء لعناوين IP</strong> — تقييد الوصول للشبكات والأجهزة المعتمدة فقط.</li>
        </ul>

        <h2 id="compliance">4. الامتثال والشهادات</h2>
        <ul>
          <li><strong>SOC 2 Type II</strong> — خضوع لتدقيق سنوي مستقل من شركة محاسبية معتمدة.</li>
          <li><strong>جاهز لـ HIPAA</strong> — متوافق مع أحمال عمل الرعاية الصحية المنظمة مع توفير اتفاقيات BAA.</li>
          <li><strong>GDPR</strong> — اتفاقيات معالجة البيانات وبنود تعاقدية قياسية متاحة عند الطلب.</li>
          <li><strong>ISO 27001</strong> — ضوابط متوافقة مع الشهادة.</li>
        </ul>

        <h2 id="deployment">5. خيارات النشر</h2>
        <ul>
          <li><strong>سحابة عامة</strong> — مناطق في الولايات المتحدة، والاتحاد الأوروبي، والمملكة العربية السعودية، والإمارات.</li>
          <li><strong>سحابة خاصة (VPC)</strong> — تُنشر داخل حساب AWS أو GCP أو Azure الخاص بك.</li>
          <li><strong>محلياً داخل الشركة (On-premise)</strong> — عمليات نشر معزولة تماماً عن الإنترنت (Air-gapped).</li>
        </ul>

        <h2 id="infrastructure">6. البنية التحتية</h2>
        <ul>
          <li>بيئات مستأجرين معزولة تماماً — بدون أي موارد حوسبة مشتركة.</li>
          <li>نسخ احتياطي تلقائي مع إمكانية الاسترداد عند أي نقطة زمنية.</li>
          <li>فحص مستمر للثغرات وترقيع أمني تلقائي.</li>
          <li>اختبارات اختراق سنوية من جهات خارجية محايدة.</li>
          <li>مراقبة على مدار الساعة طوال أيام الأسبوع 24/7.</li>
        </ul>

        <h2 id="incident-response">7. الاستجابة للحوادث</h2>
        <p>
          نحتفظ ببرنامج استجابة موثق للحوادث بمستويات خطورة محددة وبروتوكولات تواصل دقيقة:
        </p>
        <ul>
          <li>اكتشاف أي نشاط غير معتاد خلال 15 دقيقة.</li>
          <li>إشعار العميل خلال 24 ساعة من تأكيد أي حادث.</li>
          <li>تقارير ما بعد الحادث متاحة للعملاء المتأثرين.</li>
        </ul>

        <h2 id="disclosure">8. الإفصاح المسؤول</h2>
        <p>
          إذا كنت تعتقد أنك اكتشفت ثغرة أمنية، يرجى مراسلتنا على{" "}
          <a href="mailto:security@zeroqueries.com">security@zeroqueries.com</a>.
          نرد على كافة البلاغات خلال 24 ساعة ونمنح التقدير للباحثين الذين يتبعون معايير الإفصاح المسؤول.
        </p>

        <h2 id="documents">9. طلب المستندات</h2>
        <p>
          يمكن لعملاء المؤسسات والجهات المهتمة بموجب اتفاقية عدم إفصاح متبادلة طلب مستندات الامتثال الخاصة بنا:
        </p>
        <ul>
          <li>تقرير تدقيق SOC 2 Type II</li>
          <li>اتفاقية شريك الأعمال HIPAA (BAA)</li>
          <li>اتفاقية معالجة البيانات القياسية (DPA)</li>
          <li>الملخص التنفيذي لاختبار الاختراق السنوي</li>
        </ul>
        <p>
          لطلب هذه المستندات، يرجى التواصل مع ممثل حسابك أو مراسلة{" "}
          <a href="mailto:security@zeroqueries.com">security@zeroqueries.com</a>.
        </p>
      </LegalPage>
    );
  }

  return (
    <LegalPage
      title="Security & Compliance"
      subtitle="How we protect your data, meet enterprise standards, and stay audit-ready."
      lastUpdated="October 2, 2026"
      version="1.6"
      sections={SECTIONS_EN}
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
