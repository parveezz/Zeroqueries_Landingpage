import { notFound } from "next/navigation";
import ResourcePost from "@/Components/resources/ResourcePost";
import { getPostBySlug, getAllPosts } from "@/lib/blogData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Resource Not Found | ZeroQueries",
    };
  }

  return {
    title: `${post.title} | ZeroQueries Resources`,
    description: post.excerpt,
  };
}

export default async function ResourceDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <main className="w-full">
      <ResourcePost post={post} relatedPosts={relatedPosts} />
    </main>
  );
}
