import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductForm from './components/ProductForm'; // Importamos el formulario
import CategoryForm from './components/CategoryForm';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/products") // Asegúrate de que esta URL sea correcta
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    }, []);

    const handleCategoryAdded = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const handleProductAdded = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    return (
        <div>
            <h1>Mi Tienda</h1>
                        {/* Formulario para agregar categorías */}
                        <CategoryForm onCategoryAdded={handleCategoryAdded} />
<br /> <br />

            {/* Formulario para agregar productos */}
            <ProductForm onProductAdded={handleProductAdded} />

            {/* Lista de productos */}
            <ProductList products={products} addToCart={addToCart} />
            {/* Carrito de compras */}
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
        </div>
    );
};

export default App;
