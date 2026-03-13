import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Message } from '@/entities/Message';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, body: messageBody } = body;

    if (!name || !email || !subject || !messageBody) {
      return NextResponse.json(
        { error: 'All fields are required: name, email, subject, body' },
        { status: 400 }
      );
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (typeof subject !== 'string' || subject.trim().length === 0) {
      return NextResponse.json(
        { error: 'Subject must be a non-empty string' },
        { status: 400 }
      );
    }

    if (typeof messageBody !== 'string' || messageBody.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message body must be a non-empty string' },
        { status: 400 }
      );
    }

    const ds = await getDataSource();
    const messageRepo = ds.getRepository(Message);

    const message = messageRepo.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      body: messageBody.trim(),
      read: false,
    });

    await messageRepo.save(message);

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
