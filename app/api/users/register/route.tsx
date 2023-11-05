import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';

import { User } from '@prisma/client';
import prisma from '@/prisma/client';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return NextResponse.json({ error: 'User already exist' }, { status: 400 });
    }

    const password: string = await bcrypt.hash(body.password, 10);
    const newUser: User = await prisma.user.create({
      data: {
        password,
        email: body.email,
      },
    });

    return NextResponse.json({ id: newUser.id, email: newUser.email }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
