import { NextResponse } from 'next/server';
import { getBlogBySlug, updateBlog, deleteBlog } from '@/lib/blogs';

// GET /api/blogs/[slug] - Get single blog post
export async function GET(request, context) {
    try {
        const { slug } = await context.params;
        const blog = await getBlogBySlug(slug);

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: blog,
        });
    } catch (error) {
        console.error('GET /api/blogs/[slug] error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to retrieve blog post' },
            { status: 500 }
        );
    }
}

// PUT /api/blogs/[slug] - Update blog post
export async function PUT(request, context) {
    try {
        const { slug } = await context.params;
        const body = await request.json();

        const updatedBlog = await updateBlog(slug, body);

        if (!updatedBlog) {
            return NextResponse.json(
                { success: false, error: 'Blog post not found to update' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Blog post updated successfully',
            data: updatedBlog,
        });
    } catch (error) {
        console.error('PUT /api/blogs/[slug] error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update blog post' },
            { status: 500 }
        );
    }
}

// DELETE /api/blogs/[slug] - Delete blog post
export async function DELETE(request, context) {
    try {
        const { slug } = await context.params;
        const deleted = await deleteBlog(slug);

        if (!deleted) {
            return NextResponse.json(
                { success: false, error: 'Blog post not found to delete' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Blog post deleted successfully',
        });
    } catch (error) {
        console.error('DELETE /api/blogs/[slug] error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete blog post' },
            { status: 500 }
        );
    }
}
