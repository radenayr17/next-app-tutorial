'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const NavBar = () => {
  const { status } = useSession();

  return (
    <div className="flex flex-row bg-slate-200 p-5 space-x-3">
      <Link href="/" className="mr-5">
        NextJS
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>
      {status === 'authenticated' && <Link href="/api/auth/signout">Sign out</Link>}
      {status === 'unauthenticated' && (
        <Link href="/api/auth/signin" className="mr-5">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default NavBar;
