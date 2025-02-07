import  { useState, useEffect } from 'react';
import { getProducts } from '../api/api';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <span>{product.price} USD</span>
            {/* Aquí puedes agregar botones para agregar al carrito, etc. */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
