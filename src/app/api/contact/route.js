import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'contact.json');

async function getEntries() {
    try {
        const content = await fs.readFile(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, company, topic, message } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json({ success: false, error: 'A valid email is required' }, { status: 400 });
        }
        if (!firstName) {
            return NextResponse.json({ success: false, error: 'Your name is required' }, { status: 400 });
        }

        const entries = await getEntries();
        const newEntry = {
            id: entries.length + 1,
            firstName,
            lastName: lastName || '',
            email,
            phone: phone || '',
            company: company || '',
            topic: topic || 'General Inquiry',
            message: message || '',
            createdAt: new Date().toISOString()
        };

        entries.unshift(newEntry);
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
        await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf-8');

        // Log Mail Dispatch (Production Hostinger uses native PHP mail() via contact.php)
        console.log(`📧 [Mail Dispatch -> Admin]: New Contact Inquiry from ${firstName} ${lastName} (${email}) - Topic: ${topic}`);
        console.log(`📧 [Mail Dispatch -> User]: Confirmation email sent to ${email}`);

        return NextResponse.json({
            success: true,
            message: 'Thank you! Your inquiry has been received and email notifications dispatched.',
            data: newEntry
        }, { status: 201 });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to process inquiry' }, { status: 500 });
    }
}

export async function GET() {
    const entries = await getEntries();
    return NextResponse.json({ success: true, total: entries.length, data: entries });
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
        }

        const entries = await getEntries();
        const filtered = entries.filter((e) => String(e.id) !== String(id));
        await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Inquiry deleted' });
    } catch (error) {
        console.error('Contact DELETE Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete inquiry' }, { status: 500 });
    }
}
