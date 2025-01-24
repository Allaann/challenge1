import React from 'react';
import styled from 'styled-components';
import { Product } from '../types/Product';

const ItemContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
`;

const ProductTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  color: #007bff;
`;

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <ItemContainer>
      <ProductImage src={product.image} alt={product.title} />
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>Price: ${product.price}</ProductPrice>
    </ItemContainer>
  );
};

export default ProductItem;