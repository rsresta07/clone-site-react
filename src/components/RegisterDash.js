import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../js/firebase-config";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

/**
 * @function Register
 * @description A component that renders a registration form with email and password fields.
 *              It uses the useForm hook to manage form state and validation. When the form is
 *              submitted, it calls the createUserWithEmailAndPassword function from the Firebase
 *              auth library to create a new user. If the registration is successful, it dispatches a
 *              setUser action with the user's information to update the Redux store and navigates to
 *              the profile page. If the registration fails, it displays an error message with the
 *              error code.
 * @returns {ReactElement} A React component that renders a registration form.
 */
function Register() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch, // We use watch here
    } = useForm();

    // Watch the password value
    const password = watch("password");

    /**
     * Handles the form submission by calling the
     * createUserWithEmailAndPassword function from the Firebase
     * auth library to create a new user. If the registration is
     * successful, it dispatches a setUser action with the user's
     * information to update the Redux store and navigates to the
     * profile page. If the registration fails, it displays an error
     * message with the error code.
     * @param {Object} data The form data containing the email and password.
     */
    const onSubmit = async (data) => {
        setError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            console.log("User registered:", userCredential.user);
            dispatch(setUser(userCredential.user));
            navigate("/profile");
        } catch (error) {
            let alertMessage = "";
            if (error.code === "auth/email-already-in-use") {
                alertMessage =
                    "This email is already registered. Please try logging in.";
            } else if (error.code === "auth/invalid-email") {
                alertMessage =
                    "Invalid email address. Please enter a valid email.";
            } else if (error.code === "auth/weak-password") {
                alertMessage =
                    "Password is too weak. Please use a stronger password.";
            } else {
                alertMessage = "Registration failed. Please try again.";
            }
            setError(alertMessage);
            console.error("Error:", error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-gray-950 rounded-lg shadow-lg">
            <h2 className="text-6xl font-semibold text-white mb-6">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="text-left">
                    <label className="text-white">Email</label>
                    <input
                        type="email"
                        placeholder="eg. bEE@example.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email address",
                            },
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="text-left">
                    <label className="text-white">Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                message:
                                    "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number",
                            },
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="text-left">
                    <label className="text-white">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Register
                </button>
                {error && (
                    <div className="mt-4 p-4 bg-red-500 text-white rounded-md text-center">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}

export default Register;
