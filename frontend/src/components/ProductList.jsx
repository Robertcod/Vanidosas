import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchProducts } from '../api/api';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`p-6 ${darkMode ? 'bg-[#251e24] text-white' : 'bg-[#e3cce3] text-black'}`}>
      <button
        onClick={toggleDarkMode}
        className="mb-4 px-4 py-2 bg-[#b537a2] text-white rounded-md"
      >
        {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>

      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center">Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-xl shadow-md border overflow-hidden flex flex-col justify-between cursor-pointer ${
                darkMode ? 'bg-[#251e24] text-white' : 'bg-white text-black'
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative w-full pt-[100%]">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={`http://127.0.0.1:8000/storage/${product.image}`}
                  alt={product.name}
                />
              </div>
              <div className="px-4 pb-4 text-center">
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-sm mt-1 truncate">{product.description}</p>
                <p className="text-lg font-bold mt-2">${parseFloat(product.price).toFixed(2)}</p>
                <button
                  className="mt-3 w-full bg-[#b537a2] text-white py-2 rounded-md transition hover:bg-[#9e2e8d]"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    setSelectedProduct(null);
                  }}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white dark:bg-[#251e24] text-black dark:text-white p-6 rounded-xl shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-2 text-xl" onClick={() => setSelectedProduct(null)}>
              ×
            </button>
            <img
              className="w-full h-48 object-cover rounded-md"
              src={`http://127.0.0.1:8000/storage/${selectedProduct.image}`}
              alt={selectedProduct.name}
            />
            <h2 className="text-xl font-bold mt-4">{selectedProduct.name}</h2>
            <p className="mt-2">{selectedProduct.description}</p>
            <p className="text-lg font-bold mt-2">${parseFloat(selectedProduct.price).toFixed(2)}</p>
            <div className="mt-4 flex gap-2">
              <button
                className="bg-[#b537a2] text-white px-4 py-2 rounded-md w-full"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                Añadir al carrito
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md w-full"
                onClick={() => setSelectedProduct(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProductList.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default ProductList;
