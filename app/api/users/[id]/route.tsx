import { NextRequest, NextResponse } from 'next/server';

import { User } from '@prisma/client';
import prisma from '@/prisma/client';

import schema from '../schema';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
  const user: User | null = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params: { id } }: Params) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user: User | null = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const updatedUser: User = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
  const user: User | null = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(deletedUser);
}
