import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart, removeItem } from "../features/cartSlice";
import "../css/CartStyles.css";
import { useNavigate } from "react-router-dom";

/**
 * Cart component displays the cart items and their total cost.
 *
 * - Retrieves cart items from the Redux store.
 * - Calculates the total cost of items in the cart and displays it.
 * - Allows the user to remove items from the cart.
 * - Navigates to the checkout page when the user clicks "PROCEED TO CHECKOUT".
 */
function Cart() {
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const cart = useSelector((state) => state.cart.items); // Get cart items from Redux store
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        dispatch(setCart(savedCart)); // Sync cart with Redux store
        calculateBill(savedCart); // Update bill details
    }, [dispatch]);

/**
 * Calculates the subtotal, discount, and grand total for the given cart items.
 *
 * - Iterates through cart items to compute the subtotal by summing up item prices.
 * - Applies a fixed discount rate to calculate the discount amount.
 * - Computes the grand total by subtracting the discount from the subtotal.
 * - Updates state variables for subtotal, discount, and grand total with formatted values.
 *
 * @param {Array} cartItems - List of items in the cart with price properties.
 */
    const calculateBill = (cartItems) => {
        const discountRate = 10; // 10% discount
        const subTotal = cartItems.reduce(
            (total, item) => total + parseFloat(item.price),
            0
        );
        const discountAmount = (subTotal * discountRate) / 100;
        const grandTotal = subTotal - discountAmount;

        setSubTotal(subTotal.toFixed(2));
        setDiscount(discountAmount.toFixed(2));
        setGrandTotal(grandTotal.toFixed(2));
    };

/**
 * Handles the removal of an item from the cart by index.
 *
 * - Filters out the item at the given index from the cart array.
 * - Updates the local storage with the new cart state.
 * - Dispatches the removeItem action to update the cart state in the Redux store.
 * - Recalculates the bill details with the updated cart.
 *
 * @param {number} index - The index of the item to be removed from the cart.
 */
    const handleRemove = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        dispatch(removeItem(index)); // Update Redux store
        calculateBill(updatedCart);
    };

    return (
        <div>
            <main className="cart-container">
                {/* Cart Items List */}
                <div className="cart-items-list">
                    <h2>My Cart</h2>
                    <label>Cart Length: {cart.length}</label>
                    <div className="cart-items">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <img
                                        src={item.poster}
                                        alt={`${item.title} poster`}
                                    />
                                    <div className="cart-item-details">
                                        <h3>{item.title}</h3>
                                        <p style={{ color: "#28a745" }}>
                                            NPR {item.price}
                                        </p>
                                        <button
                                            onClick={() => handleRemove(index)}
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
                            <span style={{ color: "red" }}>
                                NPR -{discount}
                            </span>
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
