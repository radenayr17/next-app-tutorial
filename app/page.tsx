import Link from 'next/link';
import { getServerSession } from 'next-auth';

import ProductCard from './components/Product/ProductCard';

import authOptions from './auth/AuthOptions';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Hello {session && <span>{session.user?.name}</span>}</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}
