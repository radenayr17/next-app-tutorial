import React from 'react';
import Link from 'next/link';
import { sort } from 'fast-sort';

type TUser = {
  id: number;
  name: string;
  email: string;
};

interface Props {
  sortOrder: string;
}

const UsersTable = async ({ sortOrder }: Props) => {
  const res: Response = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
  const users: TUser[] = await res.json();

  const sortUsers: TUser[] = sort(users).asc(sortOrder === 'email' ? (user) => user.email : (user) => user.name);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortUsers.map((user: TUser) => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersTable;
