/** @format */

import axios from "axios";
import React, { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "react-toastify";
import TagInput from "../../components/SearchBar/TagInput";
import useGetNotes from "../../hook/useGetNotes";
import { serverURL } from "../../utils/server";

const EditNote = ({ title, content, tag, noteId, setNoteEditModel }) => {
    const [tags, setTags] = useState([...tag] || []);
    const { getNotes } = useGetNotes(); // Using the custom hook

    const [editTitle, setEditTitle] = useState(title);
    const [editContent, setEditContent] = useState(content);

    const [isError, setIsError] = useState("");
    const [loader, setLoader] = useState(false);

    const editNoteHandler = async () => {
        try {
            setLoader(true);
            const res = await axios.put(
                `${serverURL}/note/edit/${noteId}`,
                {
                    title: editTitle,
                    content: editContent,
                    tags,
                },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                getNotes();
                setNoteEditModel(false);
                toast.success(res.data.message);
            }
            // console.log("edit note res ", res);
        } catch (error) {
            console.log("Edit note error", error);
            toast.error(error.response?.data?.message);
        } finally {
            setLoader(false);
        }
    };

    return (
        <>
            {" "}
            {/* <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md"> */}
            <h2 className="text-2xl font-semibold text-center mb-4">edit Note</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
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
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
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
                <div className="text-center flex justify-end w-full">
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
                            className=" w-full px-4 py-2 mt-5 bg-[#000] text-white font-medium rounded-md shadow-sm"
                            onClick={editNoteHandler}
                        >
                            update
                        </button>
                    )}
                </div>
            </div>
            {/* </div> */}
        </>
    );
};

export default EditNote;
