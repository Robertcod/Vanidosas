import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CategoryForm = ({ onCategoryAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(''); // Nuevo estado para la categoría principal
    const [categories, setCategories] = useState([]); // Nuevo estado para las categorías disponibles
    const [isSubcategory, setIsSubcategory] = useState(false); // Nuevo estado para saber si estamos creando una subcategoría
    const [error, setError] = useState(null);

    // Obtener las categorías principales
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/categories');
                if (!response.ok) {
                    throw new Error('Error al obtener categorías');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error en la carga de categorías: ", error); // Imprimir error en consola
                setError(error.message);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos
        if (!name || !description || (isSubcategory && !categoryId)) {
            setError('Todos los campos son obligatorios');
            return;
        }

        console.log({
            name,
            description,
            categoryId, // Esto debería tener un valor cuando se está creando una subcategoría
        });

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        let url = 'http://localhost:8000/api/categories'; // Ruta por defecto para categorías principales

        // Si es una subcategoría, usamos la ruta de subcategorías
        if (isSubcategory) {
            url = 'http://localhost:8000/api/subcategories';
            if (categoryId) {
                formData.append('category_id', categoryId);
            } else {
                setError('Debes seleccionar una categoría principal');
                return;
            }
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    category_id: isSubcategory ? categoryId : null, // Asegurar que se envía correctamente
                }),
            });
            

            if (!response.ok) {
                throw new Error(`Error al agregar categoría: ${response.status}`);
            }

            const data = await response.json();
            onCategoryAdded(data); // Llama a la función pasada por props
            setName('');
            setDescription('');
            setCategoryId('');
            setIsSubcategory(false);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de la Categoría"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                {/* Opción para seleccionar si es una subcategoría */}
                <label>
                    ¿Es una subcategoría?
                    <input
                        type="checkbox"
                        checked={isSubcategory}
                        onChange={(e) => setIsSubcategory(e.target.checked)}
                    />
                </label>

                {/* Mostrar dropdown para seleccionar categoría principal si es subcategoría */}
                {isSubcategory && (
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una categoría principal</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                )}

                <button type="submit">
                    {isSubcategory ? 'Agregar Subcategoría' : 'Agregar Categoría'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

CategoryForm.propTypes = {
    onCategoryAdded: PropTypes.func.isRequired,
};

export default CategoryForm;
