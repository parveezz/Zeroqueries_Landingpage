import Workspace from "@/Components/Home/Workspace";
import TrustedBy from "@/Components/Home/TrustedBy";
import SupportedDatabases from "@/Components/Home/SupportedDatabases";
import Testimonials from "@/Components/Home/Testimonials";
import CTAsection from "@/Components/Home/CTAsection";
import FAQ from "@/Components/Home/FAQ";

export default function Page() {
  return (
    <>
      <Workspace />
      <TrustedBy />
      <SupportedDatabases />
      <FAQ />
      <Testimonials />
      <CTAsection />
    </>
  );
}