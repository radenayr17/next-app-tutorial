import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/prisma/client';
import { User } from '@prisma/client';

import schema from './schema';

export async function GET(request: NextRequest) {
  const users: User[] = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const emailUser: User | null = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (emailUser) {
    return NextResponse.json({ error: `Email '${body.email}' already exist` }, { status: 400 });
  }

  const user: User = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
