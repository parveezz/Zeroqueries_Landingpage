import ConversationalAI from "@/Components/solutions/ConversationalAI";
import CostOfDelay from "@/Components/solutions/CostOfDelay";
import FeaturesGrid from "@/Components/solutions/FeaturesGrid";
import HowItWorks from "@/Components/solutions/HowItWorks";
import IndustriesGrid from "@/Components/solutions/IndustriesGrid";
import PlatformBanner from "@/Components/solutions/PlatformBanner";

export const metadata = {
  title: "Solutions | ZeroQueries",
  description:
    "Explore tailored data intelligence solutions for modern teams and industries.",
};

export default function SolutionsPage() {
  return (
    <>
      <PlatformBanner />
      <HowItWorks />
      <ConversationalAI />
      <IndustriesGrid />
      <FeaturesGrid />
      <CostOfDelay />
    </>
  );
}