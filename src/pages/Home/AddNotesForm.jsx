/** @format */

import axios from "axios";
import React, { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import TagInput from "../../components/SearchBar/TagInput";
import useGetNotes from "../../hook/useGetNotes";
import { serverURL } from "../../utils/server";

const AddNotesForm = ({ setIsNotesModelOpen }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [isError, setIsError] = useState("");
    const { getNotes } = useGetNotes(); // Using the custom hook

    const { note } = useSelector((store) => store.note);

    const [loader, setLoader] = useState(false);

    const createNewNote = async () => {
        // try {
        //     setLoader(true);
        //     const res = await axios.post(
        //         `${serverURL}/note/create`,
        //         { title, content, setTags },
        //         {
        //             withCredentials: true,
        //         }
        //     );
        //     console.log("note create data : ", res);
        // } catch (error) {
        //     console.log("create note error ", error);
        // }
    };

    const handleNotesSubmit = async () => {
        if (!title) {
            setIsError("please enter note title.");
            return;
        }
        if (!content) {
            setIsError("please enter note content.");
            return;
        }
        setIsError("");

        // if (type === "edit") {
        //     editNote();
        // } else if (type === "create") {
        // createNewNote();
        // }

        try {
            setLoader(true);

            const res = await axios.post(
                `${serverURL}/note/create`,
                { title, content, tags },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                getNotes();
                setIsNotesModelOpen(false);
                toast.success(res.data.message);
            }
            console.log("note create data : ", res);
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log("create note error ", error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <>
            {" "}
            {/* <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md"> */}
            <h2 className="text-2xl font-semibold text-center mb-4">Create Note</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black "
                        placeholder="Enter note title"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium focus:outline-none focus:ring-0 text-gray-700"
                    >
                        content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="4"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black "
                        placeholder="Enter note content"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium focus:outline-none focus:ring-0 text-gray-700"
                    >
                        tag's
                    </label>
                    <TagInput tags={tags} setTags={setTags} />
                </div>
                {isError && <span className=" text-sm text-red-500">{isError}</span>}
                <div className=" text-center flex justify-end w-full">
                    {loader ? (
                        <button
                            type="button"
                            className="w-full flex justify-center py-2 mt-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black focus:outline-none "
                            disabled
                        >
                            <LuLoader2 className=" animate-spin mr-2 h-6 w-6" />
                            please wait...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className=" w-full px-4 py-2 bg-[#000] mt-5 text-white font-medium rounded-md shadow-sm"
                            onClick={handleNotesSubmit}
                        >
                            create
                        </button>
                    )}
                </div>
            </div>
            {/* </div> */}
        </>
    );
};

export default AddNotesForm;
