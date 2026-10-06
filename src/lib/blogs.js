import fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'blogs.json');

// Helper to ensure data file exists and return blogs array
export async function getAllBlogs() {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const blogs = JSON.parse(fileContent);
        return Array.isArray(blogs) ? blogs : [];
    } catch (error) {
        console.error('Error reading blogs.json:', error);
        return [];
    }
}

// Helper to get a single blog post by slug
export async function getBlogBySlug(slug) {
    const blogs = await getAllBlogs();
    return blogs.find((b) => b.slug === slug || String(b.id) === String(slug)) || null;
}

// Helper to create a new blog post
export async function createBlog(newBlogData) {
    const blogs = await getAllBlogs();

    // Auto-generate slug if not provided
    let slug = newBlogData.slug;
    if (!slug && newBlogData.titleEn) {
        slug = newBlogData.titleEn
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    if (!slug) {
        slug = `post-${Date.now()}`;
    }

    // Ensure slug is unique
    let uniqueSlug = slug;
    let counter = 1;
    while (blogs.some((b) => b.slug === uniqueSlug)) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }

    const nextId = blogs.length > 0 ? Math.max(...blogs.map((b) => Number(b.id) || 0)) + 1 : 1;

    const newPost = {
        ...newBlogData,
        id: nextId,
        slug: uniqueSlug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    blogs.unshift(newPost);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(blogs, null, 2), 'utf-8');
    return newPost;
}

// Helper to update an existing blog post
export async function updateBlog(slug, updatedData) {
    const blogs = await getAllBlogs();
    const index = blogs.findIndex((b) => b.slug === slug || String(b.id) === String(slug));

    if (index === -1) {
        return null;
    }

    const existingPost = blogs[index];
    const mergedPost = {
        ...existingPost,
        ...updatedData,
        id: existingPost.id, // preserve immutable ID
        slug: updatedData.slug || existingPost.slug,
        updatedAt: new Date().toISOString(),
    };

    blogs[index] = mergedPost;
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(blogs, null, 2), 'utf-8');
    return mergedPost;
}

// Helper to delete a blog post
export async function deleteBlog(slug) {
    const blogs = await getAllBlogs();
    const index = blogs.findIndex((b) => b.slug === slug || String(b.id) === String(slug));

    if (index === -1) {
        return false;
    }

    const deleted = blogs.splice(index, 1);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(blogs, null, 2), 'utf-8');
    return deleted[0] || true;
}
