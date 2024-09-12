/** @format */

import { Menu, MenuItem, MenuItems, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment } from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../redux/userSlice/user.slice";
import { findFirstLetter } from "../../utils/findFirstLetter";
import { serverURL } from "../../utils/server";

const ProfileInfo = () => {
    //     const yourName = 'Bhaskar Singh"';

    const { user } = useSelector((store) => store.user);

    const userNavigation = [{ name: user?.username }, { email: user?.email }];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${serverURL}/user/logout`, {
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/login");
                toast.success(res.data?.message);
            }

            // console.log("logout user res ", res);
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log("logout user error : ", error);
        }
    };

    return (
        <>
            <div className="flex items-center space-x-4">
                {/* Profile Dropdown */}
                <Menu as="div" className="relative">
                    <div>
                        <Menu.Button className="bg-white rounded-full flex focus:outline-none ">
                            <div className=" bg-gray-100 font-medium  flex items-center justify-center h-9 w-9  rounded-full">
                                {findFirstLetter(user?.username)}
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        className=" z-50"
                    >
                        <MenuItems className="origin-top-right absolute z-50 right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item, index) => (
                                <MenuItem key={index} className=" z-50">
                                    {({ active }) => (
                                        <h5
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block py-2 px-4 text-sm text-gray-700"
                                            )}
                                        >
                                            {item.name}
                                            {item.email}
                                        </h5>
                                    )}
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Transition>
                </Menu>

                {/* Logout Icon */}
                <Link
                    // to={"/login"}
                    onClick={logoutHandler}
                    className="flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 "
                >
                    <FiLogOut className="h-6 w-6" aria-hidden="true" />
                </Link>
            </div>
        </>
    );
};

export default ProfileInfo;
