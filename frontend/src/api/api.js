export const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/products'); // Asegúrate de que la URL de la API sea la correcta
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
};
