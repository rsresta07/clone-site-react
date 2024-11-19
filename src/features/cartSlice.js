import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        count: 0,
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
            state.count = state.items.length;
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(
                (_, index) => index !== action.payload
            );
            state.count = state.items.length;
        },
        setCart: (state, action) => {
            state.items = action.payload;
            state.count = state.items.length;
        },
    },
});

export const { addItem, removeItem, setCart } = cartSlice.actions;
export default cartSlice.reducer;
