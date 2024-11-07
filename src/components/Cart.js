import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CartStyles.css";

function Cart() {
    const [cart, setCart] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        displayCartItems();
    }, []);

    // Function to retrieve and display cart items
    const displayCartItems = () => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
        calculateBill(savedCart);
    };

    // Function to remove item from the cart
    const removeItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
        calculateBill(updatedCart);
    };

    // Function to calculate subtotal, discount, and grand total
    const calculateBill = (cartItems) => {
        const discountRate = 10;
        const subTotal = cartItems.reduce(
            (total, movie) => total + parseFloat(movie.price),
            0
        );
        const discountAmount = (subTotal * discountRate) / 100;
        const grandTotal = subTotal - discountAmount;

        setSubTotal(subTotal.toFixed(2));
        setDiscount(discountAmount.toFixed(2));
        setGrandTotal(grandTotal.toFixed(2));
    };

    return (
        <div>
            {/* Cart Content */}
            <main className="cart-container">
                {/* Cart Items List */}
                <div className="cart-items-list">
                    <h2>My Cart</h2>
                    <div className="cart-items">
                        {cart.length > 0 ? (
                            cart.map((movie, index) => (
                                <div key={index} className="cart-item">
                                    <img
                                        src={movie.poster}
                                        alt={`${movie.title} poster`}
                                    />
                                    <div className="cart-item-details">
                                        <h3>{movie.title}</h3>
                                        <p style={{ color: "#28a745" }}>
                                            NPR {movie.price}
                                        </p>
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="remove"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                </div>

                {/* Bill Summary */}
                <div className="bill-summary">
                    <h2>Bill Summary</h2>
                    <hr />
                    <div className="price-breakdown">
                        <div className="price-item">
                            <span>SUB TOTAL</span> <br />
                            <span>Special Offer Discount</span>
                        </div>
                        <div className="price-item">
                            <span>NPR {subTotal}</span> <br />
                            <span style={{ color: "red" }}>NPR -{discount}</span>
                        </div>
                    </div>
                    <hr />
                    <div className="total">
                        <span>Grand Total</span>
                        <span style={{ color: "green" }}>NPR {grandTotal}</span>
                    </div>
                    <button
                        className="checkout-btn"
                        onClick={() => navigate("/checkout")}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                    <p className="note">
                        Note: In the event that the store price and the price
                        listed below are different, the store price will prevail
                        in every case.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Cart;
