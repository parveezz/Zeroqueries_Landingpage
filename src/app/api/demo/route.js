import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'demo.json');

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
        const { fullName, workEmail, organization, role, dataEnvironment } = body;

        if (!workEmail || !workEmail.includes('@')) {
            return NextResponse.json({ success: false, error: 'A valid work email is required' }, { status: 400 });
        }
        if (!fullName) {
            return NextResponse.json({ success: false, error: 'Full name is required' }, { status: 400 });
        }
        if (!organization) {
            return NextResponse.json({ success: false, error: 'Organization name is required' }, { status: 400 });
        }

        const entries = await getEntries();
        const newEntry = {
            id: entries.length + 1,
            fullName,
            workEmail,
            organization,
            role: role || '',
            dataEnvironment: dataEnvironment || '',
            createdAt: new Date().toISOString()
        };

        entries.unshift(newEntry);
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
        await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf-8');

        // Log Mail Dispatch (Production Hostinger uses native PHP mail() via demo.php)
        console.log(`📧 [Mail Dispatch -> Admin]: New Enterprise Demo Request from ${fullName} (${workEmail}) - ${organization}`);
        console.log(`📧 [Mail Dispatch -> User]: Confirmation email sent to ${workEmail}`);

        return NextResponse.json({
            success: true,
            message: 'Demo request received! Our engineering team will contact you shortly.',
            data: newEntry
        }, { status: 201 });
    } catch (error) {
        console.error('Demo API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to process demo request' }, { status: 500 });
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

        return NextResponse.json({ success: true, message: 'Demo request deleted' });
    } catch (error) {
        console.error('Demo DELETE Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete demo request' }, { status: 500 });
    }
}
