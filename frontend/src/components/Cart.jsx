import PropTypes from 'prop-types'; // Importa PropTypes

const Cart = ({ cartItems, removeFromCart }) => {
    return (
        <div>
            <h2>Carrito</h2>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <h3>{item.name}</h3>
                            <p>Precio: ${parseFloat(item.price).toFixed(2)}</p>
                            <button onClick={() => removeFromCart(item.id)}>
                                Eliminar del carrito
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

Cart.propTypes = {
    cartItems: PropTypes.array.isRequired, // Validamos que cartItems sea un array
    removeFromCart: PropTypes.func.isRequired, // Validamos que removeFromCart sea una función
};

export default Cart;
