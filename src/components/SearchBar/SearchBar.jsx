/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useGetNotes from "../../hook/useGetNotes";
import { setAllNotes } from "../../redux/noteSlice/note.slice";
import { serverURL } from "../../utils/server";

const SearchBar = ({ searchNote, setSearchNote }) => {
    const [input, setInput] = useState("");
    const { getNotes } = useGetNotes(); // Using the custom hook

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        // change the value in input
        setInput(e.target.value);
    };

    const handleClearSearch = () => {
        // if click the cross icon clear the input text
        setInput("");
        setSearchNote(false);

        // dispatch(setAllNotes(getNotes()));

        getNotes();
    };

    const handleSearchNote = async () => {
        if (input) {
            try {
                const res = await axios.get(`${serverURL}/note/search`, {
                    params: { query: input },
                    withCredentials: true,
                });

                // console.log("serach notes is ", res);

                if (res.data.success) {
                    dispatch(setAllNotes(res.data?.notes));
                    setSearchNote(true);
                } else {
                    toast.info(res.data.message); // Show message if no notes found
                }

                // set the notes in state
            } catch (error) {
                toast.error(error.response?.data?.message);
                console.log(error);
            }
        }
    };
    useEffect(() => {
        // Call getNotes() when the input is cleared
        if (input === "") {
            getNotes();
        }
    }, [input, getNotes]);
    return (
        <>
            <div className="flex-1 max-w-lg mx-auto px-4">
                <div className="relative">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        className="block w-full bg-gray-50 rounded-md py-2 pl-2 sm:pl-4  text-sm  focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
                        placeholder="find notes..."
                        value={input}
                        onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 px-1 sm:px-4 flex gap-1 items-center justify-center cursor-pointer">
                        {input && (
                            <IoCloseOutline
                                className="h-6 w-6 text-gray-800 "
                                aria-hidden="true"
                                onClick={handleClearSearch}
                            />
                        )}
                        <FiSearch className="h-5 w-5 text-gray-800" aria-hidden="true" onClick={handleSearchNote} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchBar;
