import { NextResponse } from 'next/server';
import { getAllBlogs, createBlog } from '@/lib/blogs';

// GET /api/blogs - List all blogs
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        let blogs = await getAllBlogs();

        if (category && category !== 'all') {
            blogs = blogs.filter((b) => b.category === category);
        }

        if (search) {
            const query = search.toLowerCase();
            blogs = blogs.filter(
                (b) =>
                    b.titleEn?.toLowerCase().includes(query) ||
                    b.titleAr?.includes(query) ||
                    b.excerptEn?.toLowerCase().includes(query) ||
                    b.excerptAr?.includes(query)
            );
        }

        return NextResponse.json({
            success: true,
            total: blogs.length,
            data: blogs,
        });
    } catch (error) {
        console.error('GET /api/blogs error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}

// POST /api/blogs - Create new blog post
export async function POST(request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.titleEn && !body.titleAr) {
            return NextResponse.json(
                { success: false, error: 'Article title (English or Arabic) is required' },
                { status: 400 }
            );
        }

        const newPost = await createBlog(body);

        return NextResponse.json(
            {
                success: true,
                message: 'Blog post created successfully',
                data: newPost,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('POST /api/blogs error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create blog post' },
            { status: 500 }
        );
    }
}
