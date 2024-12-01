import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import banner from '../assets/banner.png';
import './style.css'
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


type LoginInputs = {
    email: string;
    password: string;
};

export default function Login() {
    const { user } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = React.useState(false)
    const [redirect, setRedirect] = React.useState(false); // State to control redirection

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginInputs>();

    useEffect(() => {
        console.log(user)
        if (user) {
            setRedirect(true);
        }
    }, [user]);

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        setLoading(true); // Set loading to true when submitting
        console.log("Login Data:", data);

        // Simulate a delay (e.g., API call)
        setTimeout(() => {
            setLoading(false); // Set loading to false after the "API call"
            reset()
        }, 2000); // Simulate a 2-second delay
    };

    // Conditional rendering to redirect user to dashboard
    if (redirect) {
        return <Navigate to="/dashboard" />;
    }


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 w-full flex justify-center items-center">
            <div className=" flex flex-col shadow-lg rounded-lg overflow-hidden lg:w-[50%] h-[100%] bg-white">
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r p-2 from-blue-500 to-purple-600 animate-gradient-text">
                    Cloud Manage task
                </h1>
                <div className="flex lg:flex-row flex-col w-full h-[100%] bg-white items-center">
                    {/* Animated Banner */}
                    <div className="banner lg:w-1/2 w-full text-white flex justify-center items-center">
                        <img
                            src={banner}
                            alt="img"
                            className="transition-transform"
                        />
                    </div>
                    {/* Form */}
                    <div className="lg:w-1/2 w-full  rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-text">Welcome Back !</h2>
                        <p className="mb-6">Keep all npm run devyour credential safe</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-start pl-2 pb-2 font-bold  text-sm  text-blue-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className={`w-full px-4 py-2 border rounded-lg text-sm ${errors.email ? "border-red-500" : "border-gray-300"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-sm text-start pl-2">{errors.email.message}</p>}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-start pl-2 pb-2 font-bold  text-sm  text-blue-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className={`w-full px-4 py-2 border rounded-lg text-sm ${errors.password ? "border-red-500" : "border-gray-300"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters long",
                                        },
                                    })}
                                />
                                {errors.password && <p className="text-red-500 text-sm text-start pl-2">{errors.password.message}</p>}
                            </div>
                            {/* Forgot Password Link */}
                            <div className="text-end">
                                <a
                                    href="/forgot-password"
                                    className="text-sm text-blue-500 hover:text-blue-700 hover:underline hover:scale-105 transition-all duration-500"
                                >
                                    Forgot Password?
                                </a>
                            </div>


                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading} // Disable the button when loading is true
                                className="relative inline-flex border-blue-600 border-2 justify-start px-6 py-3 w-full lg:w-[80%] overflow-hidden font-medium transition-all bg-white rounded-lg hover:bg-white group"
                            >
                                {loading ? (
                                    <div className="spinner-border animate-spin w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                                ) : (
                                    <>
                                        <span className="w-48 h-48 rounded rotate-[-40deg] bg-blue-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                        <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Login</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
