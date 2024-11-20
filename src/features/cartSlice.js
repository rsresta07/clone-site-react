import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        count: 0,
    },
    reducers: {
        /**
         * Removes an item from the cart by index.
         * @param {number} action.payload - The index of the item to remove.
         * @returns {object} The updated cart state.
         */
        removeItem: (state, action) => {
            state.items = state.items.filter(
                (_, index) => index !== action.payload
            );
            state.count = state.items.length;
        },

        /**
         * Sets the cart state to the given items.
         * @param {object} action.payload - The items to set in the cart.
         * @returns {object} The updated cart state.
         */
        setCart: (state, action) => {
            state.items = action.payload;
            state.count = state.items.length;
        },
    },
});

export const { removeItem, setCart } = cartSlice.actions;
export default cartSlice.reducer;
