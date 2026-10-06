"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ConversationalPreview } from "./previews/ConversationalPreview";
import { InsightsPreview } from "./previews/InsightsPreview";
import { AgenticPreview } from "./previews/AgenticPreview";
import { VizpadPreview } from "./previews/VizpadPreview";
import { ConnectPreview } from "./previews/ConnectPreview";
import { AutoMLPreview } from "./previews/AutoMLPreview";

const PREVIEWS = {
    conversational: ConversationalPreview,
    insights: InsightsPreview,
    agentic: AgenticPreview,
    vizpads: VizpadPreview,
    connect: ConnectPreview,
    automl: AutoMLPreview,
};

export function FeaturePreview({ features, activeIndex, reducedMotion }) {
    const { lang } = useLanguage();
    const isAr = lang === "ar";
    const activeFeature = features[activeIndex];
    const PreviewComponent = PREVIEWS[activeFeature?.preview];
    const [displayedId, setDisplayedId] = useState(activeFeature?.id);
    const [isAnimating, setIsAnimating] = useState(false);

    // When the active feature changes, animate the swap
    useEffect(() => {
        if (activeFeature?.id === displayedId) return;
        if (reducedMotion) {
            setDisplayedId(activeFeature?.id);
            return;
        }

        setIsAnimating(true);
        const t = setTimeout(() => {
            setDisplayedId(activeFeature?.id);
            setIsAnimating(false);
        }, 250);

        return () => clearTimeout(t);
    }, [activeFeature?.id, displayedId, reducedMotion]);

    const displayedFeature = features.find((f) => f.id === displayedId) || features[0];
    const DisplayedPreview = PREVIEWS[displayedFeature?.preview];

    return (
        <div className="relative w-full">
            {/* Outer glass container */}
            <div className="relative rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-[0_30px_80px_-40px_rgba(124,58,237,0.25)]">
                {/* Top gradient bar */}
                <div className="h-[3px] w-full bg-gradient-to-r from-[#7C3AED] via-[#2563EB] to-[#EC4899] opacity-80" />

                {/* Preview viewport — responsive min-height on mobile prevents cutting off bottom content */}
                <div className="relative min-h-[460px] sm:min-h-[440px] lg:min-h-0 lg:aspect-[16/10] overflow-hidden">
                    {/* Feature-specific preview */}
                    <div
                        className={`absolute inset-0 transition-all duration-500 ease-out ${isAnimating
                                ? "opacity-0 translate-y-3 scale-[0.98]"
                                : "opacity-100 translate-y-0 scale-100"
                            }`}
                    >
                        {DisplayedPreview && <DisplayedPreview />}
                    </div>
                </div>

                {/* Bottom status bar */}
                <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-3.5 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white text-[9px] font-medium shrink-0">
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs sm:text-[13px] text-black/70 font-light truncate">
                            {activeFeature?.description}
                        </span>
                    </div>
                    <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-[10px] font-medium tracking-[0.15em] uppercase text-black/40">
                        {isAr ? "معاينة حية" : "Live preview"}
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default FeaturePreview;