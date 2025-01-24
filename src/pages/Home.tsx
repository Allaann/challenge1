import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const HomeContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const CatalogContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 15px;
  text-align: center;
  width: 200px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const ProductTitle = styled.h3`
  font-size: 1.2em;
  color: #007bff;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 1em;
  color: #333;
`;

const Home: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Mengambil data produk dari Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil kategori');
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Filter produk berdasarkan kategori yang dipilih
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <HomeContainer>
      <Title>Selamat Datang di AKA Store</Title>
      <h2 style={{ textAlign: 'center' }}>Happy Shopping</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      {/* Menampilkan kategori sebagai tombol */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {categories.map(category => (
          <button key={category} onClick={() => setSelectedCategory(category)} style={{ margin: '5px' }}>
            {category}
          </button>
        ))}
        <button onClick={() => setSelectedCategory('')} style={{ margin: '5px' }}>
          Semua
        </button>
      </div>

      <CatalogContainer>
        {filteredProducts.map(product => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>Harga: ${product.price}</ProductPrice>
          </ProductCard>
        ))}
      </CatalogContainer>
    </HomeContainer>
  );
};

export default Home;