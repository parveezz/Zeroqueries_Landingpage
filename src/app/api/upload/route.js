import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// POST /api/upload - Handle image uploads to public/uploads
export async function POST(request) {
    try {
        const data = await request.formData();
        const file = data.get('file');

        if (!file || typeof file === 'string') {
            return NextResponse.json(
                { success: false, error: 'No image file provided' },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize file extension and name
        const originalName = file.name || 'image.jpg';
        const ext = path.extname(originalName).toLowerCase() || '.jpg';
        const cleanBase = path
            .basename(originalName, ext)
            .toLowerCase()
            .replace(/[^a-z0-9_-]/g, '_');
        const filename = `${cleanBase}-${Date.now()}${ext}`;

        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        const targetPath = path.join(uploadDir, filename);
        await fs.writeFile(targetPath, buffer);

        const fileUrl = `/uploads/${filename}`;

        return NextResponse.json({
            success: true,
            message: 'Image uploaded successfully',
            url: fileUrl,
            filename,
        });
    } catch (error) {
        console.error('POST /api/upload error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to upload image file' },
            { status: 500 }
        );
    }
}
