/** @format */

import axios from "axios";
import React, { useState } from "react";
import { FiLock, FiUnlock } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { MdSecurity } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { serverURL } from "../../utils/server";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isError, setIsError] = useState("");
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

    const handleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // check the user Email is include a {@} sign and {.} char
        return regex.test(email);
    };

    const handleValidUsername = (e) => {
        const input = e.target.value;
        const regex = /^[a-z\s]*$/;

        if (regex.test(input)) {
            setIsError(""); // Clear the error if the input is valid
        } else {
            setIsError("username must contain only lowercase letters.");
        }

        setUsername(input);
    };

    const signupHandler = async (e) => {
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
        if (!username) {
            setIsError("enter a username");
            return;
        }

        setIsError("");

        // signup api Implement

        try {
            setLoader(true);

            const res = await axios.post(
                `${serverURL}/user/signup`,
                { username, email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }

            // console.log("sign up user res", res);
        } catch (error) {
            console.log("signup user error", error);
            toast.error(error.response?.data?.message);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <MdSecurity size={35} className=" w-full mx-auto" />

                <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">Create your new account</h2>
                <p className="mt-2 text-center text-sm text-gray-900 max-w">
                    or already have an account{" "}
                    <Link
                        to={"/login"}
                        className="font-medium text-blue-500 hover:text-blue-600 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        login
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={signupHandler}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={handleValidUsername}
                                    placeholder="username"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black  sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
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
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black  sm:text-sm"
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
                                    Create
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
