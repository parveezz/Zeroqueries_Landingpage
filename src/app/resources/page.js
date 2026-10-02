import ResourcesGrid from "@/Components/resources/ResourcesGrid";
import { getAllPosts } from "@/lib/blogData";

export const metadata = {
  title: "Resources & Insights | ZeroQueries",
  description:
    "Explore guides, engineering deep dives, compliance architecture, and resources for natural-language analytics and data intelligence.",
};

export default async function ResourcesPage() {
  const posts = await getAllPosts();

  return (
    <main className="w-full">
      <ResourcesGrid posts={posts} />
    </main>
  );
}
