import Workspace from "@/Components/Home/Workspace";
import TrustedBy from "@/Components/Home/TrustedBy";
import SupportedDatabases from "@/Components/Home/SupportedDatabases";
import Testimonials from "@/Components/Home/Testimonials";
import CTAsection from "@/Components/Home/CTAsection";
import FAQ from "@/Components/Home/FAQ";
import ReviewsMarquee from "@/Components/Home/ReviewsMarquee";
import DiscoverSection from "@/Components/Home/DiscoverSection";

export default function Page() {
  return (
    <>
      <Workspace />
      <TrustedBy />
      <SupportedDatabases />
      <ReviewsMarquee />
      <FAQ />
      <Testimonials />
      <CTAsection />
      <DiscoverSection />
    </>
  );
}