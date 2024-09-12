/** @format */

import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="text-sm mt-10 bg-gray-50 z-10 ">
                <div className=" border-t py-5 px-10 border-slate-200 sm:flex justify-between">
                    <div className="mb-6 sm:mb-0 sm:flex">
                        <p>Copyright © 2024 Develop By</p>
                        <p className="sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-200">
                            <Link className="hover:text-slate-900" to={"/"}>
                                bhaskar bisht
                            </Link>
                        </p>
                    </div>
                    <div className="flex space-x-8 text-gray-700 ">
                        <Link to="https://github.com/Bhaskar-bisht" target="_blank" className="hover:text-slate-500">
                            <span className="sr-only">GitHub</span>
                            <FaGithub size={24} />
                        </Link>
                        <Link
                            to="https://www.linkedin.com/in/bhashkar-singh-bisht-43255b274?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            className="hover:text-slate-500"
                        >
                            <span className="sr-only">Linkedin</span>
                            <FaLinkedinIn size={24} />
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
