import SingleBlogPost from "@/Components/blog/singleBlogPost";
import { getBlogBySlug } from "@/lib/blogs";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getBlogBySlug(slug);

    if (!post) {
        return {
            title: "Article | ZeroQueries",
            description: "Read in-depth case studies and conversational AI updates from ZeroQueries.",
        };
    }

    return {
        title: `${post.titleEn || "Article"} | ZeroQueries`,
        description: post.subtitleEn || post.excerptEn || "ZeroQueries enterprise decision intelligence.",
    };
}

export default async function SingleBlogPage({ params }) {
    const { slug } = await params;
    const post = await getBlogBySlug(slug);

    return <SingleBlogPost post={post || undefined} slug={slug} />;
}
