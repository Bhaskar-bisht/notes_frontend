/** @format */

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import ProfileInfo from "./Profile/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = ({ getNotes, searchNote, setSearchNote }) => {
    return (
        <header className="bg-white shadow-sm sticky">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex bg-red-200 h-12 items-center flex-shrink-0">
                        <Link to={"/"} className="flex items-center">
                            <img className="block h-20 w-full" src={logo} alt="note's" />
                            {/* <span className="ml-2 text-xl font-bold ">note's</span> */}
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <SearchBar getNotes={getNotes} searchNote={searchNote} setSearchNote={setSearchNote} />

                    {/* User Profile and Logout Button */}
                    <ProfileInfo />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
