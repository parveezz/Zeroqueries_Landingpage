import Contact from "@/Components/demo/Contact";
import DataStackGrid from "@/Components/demo/DataStackGrid";
import TestimonialsSection from "@/Components/demo/TestimonialsSection";

export const metadata = {
  title: "Book an Enterprise Demo | ZeroQueries",
  description:
    "Schedule a live tailored walkthrough with ZeroQueries enterprise AI and decision intelligence specialists.",
};

export default function DemoPage() {
  return (
    <>
      <Contact />
      <DataStackGrid />
      <TestimonialsSection />
    </>
  );
}