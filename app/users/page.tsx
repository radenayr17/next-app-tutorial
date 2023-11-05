import React, { Suspense } from 'react';
import Link from 'next/link';

import UsersTable from './UsersTable';

interface Props {
  searchParams: { sortOrder: string };
}

const UserPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className="btn btn-primary">
        New User
      </Link>
      <Suspense fallback={<p>Loading...</p>}>
        <UsersTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UserPage;
