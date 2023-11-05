import { JWT, getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  return NextResponse.json({ token });
}
