import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProductForm = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryId, setSubcategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/categories');
                if (!response.ok) throw new Error('Error al obtener categorías');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (categoryId) {
            const fetchSubcategories = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/api/categories/${categoryId}/subcategories`);
                    const responseText = await response.text(); // Capturar la respuesta como texto
                    console.log("Respuesta de la API:", responseText);
            
                    if (!response.ok) {
                        throw new Error(`Error al obtener subcategorías: ${response.status}`);
                    }
            
                    const data = JSON.parse(responseText);
                    setSubcategories(data);
                } catch (error) {
                    console.error("Error al obtener subcategorías:", error);
                    setError(error.message);
                }
            };
            

            fetchSubcategories();
        } else {
            setSubcategories([]);
        }
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', parseFloat(price)); // Asegurar que el precio se envíe correctamente
        if (image) formData.append('image', image);
        formData.append('category_id', categoryId);
        formData.append('subcategory_id', subcategoryId);
    
        // Verificar que category_id se está enviando correctamente
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    
        try {
            const response = await fetch('http://localhost:8000/api/products', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json', // Importante para Laravel
                },
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Error al agregar producto');
            }
    
            onProductAdded(data);
            setName('');
            setDescription('');
            setPrice('');
            setImage(null);
            setCategoryId('');
            setSubcategoryId('');
            setError(null);
        } catch (error) {
            console.error('Error en la petición:', error);
            setError(error.message);
        }
    };
    
    

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />

                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                {categoryId && (
                    <select value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} required>
                        <option value="">Selecciona una subcategoría</option>
                        {subcategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </select>
                )}

                <button type="submit">Agregar Producto</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

ProductForm.propTypes = {
    onProductAdded: PropTypes.func.isRequired,
};

export default ProductForm;
