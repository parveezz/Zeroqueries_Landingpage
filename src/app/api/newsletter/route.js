import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'newsletter.json');

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
        const { email } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json({ success: false, error: 'A valid email address is required' }, { status: 400 });
        }

        const entries = await getEntries();
        const cleanEmail = email.trim().toLowerCase();

        const alreadyExists = entries.some(e => e.email?.toLowerCase() === cleanEmail);
        if (!alreadyExists) {
            const newEntry = {
                id: entries.length + 1,
                email: cleanEmail,
                status: 'active',
                subscribedAt: new Date().toISOString()
            };
            entries.push(newEntry);
            await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
            await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf-8');
        }

        // Log Mail Dispatch (Production Hostinger uses native PHP mail() via newsletter.php)
        console.log(`📧 [Mail Dispatch -> Admin]: New Newsletter Subscriber: ${cleanEmail}`);
        console.log(`📧 [Mail Dispatch -> Subscriber]: Welcome email sent to ${cleanEmail}`);

        return NextResponse.json({
            success: true,
            message: 'Thank you for subscribing to ZeroQueries updates!'
        }, { status: 201 });
    } catch (error) {
        console.error('Newsletter API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to subscribe' }, { status: 500 });
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
        const email = searchParams.get('email');
        if (!id && !email) {
            return NextResponse.json({ success: false, error: 'ID or email is required' }, { status: 400 });
        }

        const entries = await getEntries();
        const filtered = entries.filter((e) => {
            if (id && String(e.id) === String(id)) return false;
            if (email && e.email?.toLowerCase() === email.toLowerCase()) return false;
            return true;
        });
        await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Subscriber removed' });
    } catch (error) {
        console.error('Newsletter DELETE Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete subscriber' }, { status: 500 });
    }
}
