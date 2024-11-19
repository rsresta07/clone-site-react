import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../js/firebase-config";
import { useNavigate } from "react-router-dom";

/**
 * @function UserProfile
 * @description A component that renders the user profile page.
 *
 * When the component mounts, it checks if the user is logged in. If not,
 * it displays a "Loading..." message. If the user is logged in, it renders
 * a page with the user's email and a logout button.
 *
 * When the logout button is clicked, the component calls the signOut
 * function from the Firebase auth library to log the user out. If the
 * logout is successful, it dispatches a clearUser action to update the
 * Redux store and navigates to the login page. If the logout fails, it
 * displays an error message with the error code.
 *
 * @returns {ReactElement} A React component that renders the user
 * profile page.
 */
function UserProfile() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * @function logout
     * @description Logs the user out by calling the signOut function
     *              from the Firebase auth library and dispatching a
     *              clearUser action to update the Redux store.
     *
     * @returns {Promise<void>} A Promise that resolves if the logout
     * is successful, or rejects with an error message if the logout
     * fails.
     */
    const logout = async () => {
        try {
            await signOut(auth);
            dispatch(clearUser());
            navigate("/login-auth");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!user) {
        return (
            <div className="text-center mt-20">
                <p className="text-white text-2xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 mt-20 rounded-lg shadow-lg">
            <h1 className="text-6xl font-bold text-white mb-6">User Profile</h1>
            <p className="text-3xl text-white mb-4">
                <span className="font-semibold">Email:</span> {user.email}
            </p>
            <button
                onClick={logout}
                className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
                Logout
            </button>
        </div>
    );
}

export default UserProfile;
