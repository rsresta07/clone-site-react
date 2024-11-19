import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, // Default to no user
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /**
         * Sets the user state to the given user object.
         * @param {Object} action.payload - The user object to set as the current user.
         */
        setUser: (state, action) => {
            state.user = action.payload;
        },
        
        /**
         * Clears the user state by setting it to null.
         */
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
