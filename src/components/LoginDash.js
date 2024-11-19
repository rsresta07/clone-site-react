import React from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../js/firebase-config";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            console.log("User logged in successfully:", userCredential.user);

            dispatch(
                setUser({
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                })
            );

            navigate("/profile");
        } catch (error) {
            let alertMessage = "";
            if (error.code === "auth/user-not-found") {
                alertMessage =
                    "No account found with this email. Please register.";
            } else if (error.code === "auth/wrong-password") {
                alertMessage = "Incorrect password. Please try again.";
            } else {
                alertMessage = "Login failed. Please try again.";
            }
            console.error("Error:", alertMessage);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-gray-950 rounded-lg shadow-lg">
            <h2 className="text-6xl font-bold text-white mb-6">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        type="email"
                        placeholder="Email"
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
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                                message:
                                    "Password must be 6-20 characters long, contain at least one uppercase letter, one lowercase letter, and one number",
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
                <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Login
                </button>
            </form>
            <p className="mt-8 text-gray-400">
                Don't have an account?{" "}
                <a
                    href="/registration"
                    className="text-blue-500 hover:underline"
                >
                    Register
                </a>
            </p>
        </div>
    );
}

export default Login;
