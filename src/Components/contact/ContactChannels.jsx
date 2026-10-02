import { FiMail, FiHelpCircle, FiGlobe, FiArrowRight } from "react-icons/fi";

const contactChannels = [
  {
    icon: FiMail,
    title: "Sales & Inquiries",
    description:
      "Talk with our team about plans, pricing, and tailored deployments.",
    contact: "sales@zeroqueries.com",
    href: "mailto:sales@zeroqueries.com",
    badge: "< 2 hr response",
  },
  {
    icon: FiHelpCircle,
    title: "Technical Support",
    description:
      "Help with connectors, integrations, and workspace configuration.",
    contact: "support@zeroqueries.com",
    href: "mailto:support@zeroqueries.com",
    badge: "24/7 for Enterprise",
  },
  {
    icon: FiGlobe,
    title: "Partnerships & Press",
    description: "Collaborations, technology alliances, and media requests.",
    contact: "partners@zeroqueries.com",
    href: "mailto:partners@zeroqueries.com",
    badge: "Global Relations",
  },
];

export default function ContactChannels() {
  return (
    <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-gray-200">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-light text-black tracking-tight">
          Other ways to reach us
        </h2>
        <p className="mt-2 text-sm text-black/60 font-light">
          Pick the channel that best fits your inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {contactChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <div
              key={channel.title}
              className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-gray-400 hover:shadow-md transition-all"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
                <Icon className="h-5 w-5" />
              </div>
              <div className="w-full min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-base font-medium text-black tracking-tight truncate">
                    {channel.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-medium text-black border border-gray-200 whitespace-nowrap">
                    {channel.badge}
                  </span>
                </div>
                <p className="mt-1 text-sm text-black/70 leading-relaxed font-light mb-3">
                  {channel.description}
                </p>
                <a
                  href={channel.href}
                  className="inline-flex items-center gap-1.5 text-sm font-normal text-black hover:underline"
                >
                  <span className="truncate">{channel.contact}</span>
                  <FiArrowRight className="h-3.5 w-3.5 shrink-0" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
