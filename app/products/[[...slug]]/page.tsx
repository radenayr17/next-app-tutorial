import React from 'react';

interface Props {
  params: {
    slug: string[];
  };
  searchParams: { sortOrder: string };
}

const ProductPage = ({ params: { slug }, searchParams: { sortOrder } }: Props) => {
  return (
    <div>
      Product Page slug:{slug} sort:{sortOrder}
    </div>
  );
};

export default ProductPage;
