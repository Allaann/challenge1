import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { Product } from '../types/Product';

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ListContainer>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ListContainer>
  );
};

export default ProductList;