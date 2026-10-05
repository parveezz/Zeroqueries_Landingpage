"use client";

export function FeatureNavigation({ features, activeIndex, onSelect }) {
    return (
        <nav aria-label="Feature navigation" className="relative">
            <ul className="flex flex-col gap-2 sm:gap-3">
                {features.map((feature, i) => (
                    <li key={feature.id}>
                        <FeatureItem
                            feature={feature}
                            isActive={i === activeIndex}
                            onClick={() => onSelect(i)}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// ============================================================================
// FEATURE ITEM
// ============================================================================
function FeatureItem({ feature, isActive, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-current={isActive ? "true" : undefined}
            className="group flex w-full items-center gap-4 text-left py-3 px-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
            {/* Indicator */}
            <span className="relative flex items-center justify-center w-5 h-5 shrink-0">
                {/* Outer glow — only when active */}
                <span
                    className={`absolute inset-0 rounded-full transition-all duration-500 ease-out ${isActive
                            ? "bg-[#7C3AED] opacity-25 blur-[6px] scale-150"
                            : "bg-transparent opacity-0"
                        }`}
                    aria-hidden="true"
                />
                {/* Circle */}
                <span
                    className={`relative block rounded-full transition-all duration-500 ease-out ${isActive
                            ? "w-2.5 h-2.5 bg-[#7C3AED] shadow-[0_0_10px_2px_rgba(124,58,237,0.5)]"
                            : "w-2 h-2 bg-transparent border border-black/20 group-hover:border-black/40"
                        }`}
                    aria-hidden="true"
                />
            </span>

            {/* Title */}
            <span
                className={`transition-all duration-500 ease-out tracking-tight leading-snug ${isActive
                        ? "text-[19px] sm:text-[22px] lg:text-[26px] font-medium text-black"
                        : "text-[16px] sm:text-[18px] lg:text-[20px] font-light text-black/40 group-hover:text-black/70"
                    }`}
            >
                {feature.title}
            </span>
        </button>
    );
}

export default FeatureNavigation;