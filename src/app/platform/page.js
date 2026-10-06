import PlatformHero from "@/Components/platform/PlatformHero";
import PlatformChannels from "@/Components/platform/PlatformChannels";
import PlatformFeatures from "@/Components/platform/PlatformFeatures";
import FinalCTA from "@/Components/Home/CTAsection";

export const metadata = {
  title: "Platform | ZeroQueries",
  description:
    "Ask your data anything — from WhatsApp, Slack, the web app, or the API. ZeroQueries turns plain English into live, trusted answers.",
};

export default function PlatformPage() {
  return (
    <main className="w-full">
      <PlatformHero />
      <PlatformChannels />
      <PlatformFeatures />
      <FinalCTA />
    </main>
  );
}