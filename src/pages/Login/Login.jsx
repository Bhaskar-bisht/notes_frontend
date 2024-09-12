/** @format */

import axios from "axios";
import React, { useState } from "react";
import { FiLock, FiUnlock } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../redux/userSlice/user.slice";
import { serverURL } from "../../utils/server";
import { AiOutlineSecurityScan } from "react-icons/ai";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isError, setIsError] = useState("");
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // check the user Email is include a {@} sign and {.} char
        return regex.test(email);
    };

    const loginHandler = async (e) => {
        e.preventDefault();

        // check user provide a valid email it's mean user include a {@ and .} char in our email address
        // not use required to check directly
        if (!validateEmail(email)) {
            setIsError("email must include '@' and '.' characters.");
            return;
        }

        // not use {required} to check the password is enter or not
        if (!password) {
            setIsError("enter a password");
            return;
        }

        setIsError("");

        // Login api Implement

        try {
            setLoader(true);

            const res = await axios.post(
                `${serverURL}/user/login`,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data?.message);
            }

            // console.log("login res is ", res);
        } catch (error) {
            console.log("login error ", error);
            toast.error(error.response?.data?.message);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <AiOutlineSecurityScan size={35} className=" w-full mx-auto" />
                <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-900 max-w">
                    or create a{" "}
                    <Link
                        to={"/signup"}
                        className="font-medium text-blue-500 hover:text-blue-600 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={loginHandler}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    // required
                                    placeholder="your@gmail.com"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 rounded-md shadow-sm flex relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={isShowPassword ? "text" : "password"}
                                    value={password}
                                    // required
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    placeholder="password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black  sm:text-sm"
                                />
                                <span className=" absolute right-3 top-3 cursor-pointer">
                                    {isShowPassword ? (
                                        <FiUnlock onClick={handleShowPassword} />
                                    ) : (
                                        <FiLock onClick={handleShowPassword} />
                                    )}
                                </span>
                            </div>
                        </div>

                        {isError && <span className=" text-sm text-red-500">{isError}</span>}

                        {/* <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-blue-500 hover:text-blue-600 focus:outline-none focus:underline transition ease-in-out duration-150"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div> */}

                        <div className="mt-6">
                            {loader ? (
                                <button
                                    type="button"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black focus:outline-none "
                                    disabled
                                >
                                    <LuLoader2 className=" animate-spin mr-2 h-6 w-6" />
                                    please wait...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none "
                                >
                                    Sign in
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
