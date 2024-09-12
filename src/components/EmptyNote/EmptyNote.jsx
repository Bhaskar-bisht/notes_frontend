/** @format */

import React from "react";
// import { HiOutlinePencil } from "react-icons/hi2";
import { PiPencilSimpleSlashThin } from "react-icons/pi";

const EmptyNote = ({ textContent }) => {
    return (
        <div class="flex items-center justify-center  p-4">
            <div class="relative w-full max-w-md md:w-[50%] h-[60vh] bg-blue-200 rounded-lg shadow-lg p-4">
                <div class="flex items-center justify-center">
                    {/* <!-- Eye Left --> */}
                    <div class="absolute top-0 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <div class="w-4 h-4 bg-black rounded-full animate-spin"></div>
                    </div>
                    {/* <!-- Eye Right --> */}
                    <div class="absolute top-0 right-1/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <div class="w-4 h-4 bg-black rounded-full animate-spin"></div>
                    </div>
                </div>
                {/* <!-- Card Content --> */}
                <div class="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg shadow-inner m-4">
                    <p class="text-center text-lg px-4">{textContent}</p>
                </div>
                {/* <!-- Icon --> */}
                <div class="absolute bottom-6 right-6 p-2 rounded-full">
                    <PiPencilSimpleSlashThin size={50} />
                </div>
            </div>
        </div>
    );
};

export default EmptyNote;
