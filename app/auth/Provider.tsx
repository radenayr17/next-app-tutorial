'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const AuthProvier = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvier;
