/** @format */

import React, { useState } from "react";
import { IoAdd, IoCloseOutline } from "react-icons/io5";

const TagInput = ({ tags, setTags }) => {
    const [inputTag, setInputTag] = useState("");

    const handleRemoveTags = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleTagInputChange = (e) => {
        const tagInput = e.target.value;
        setInputTag(tagInput);
    };

    const addNewTag = () => {
        if (inputTag.trim() !== "") {
            setTags([...tags, inputTag.trim()]);
            setInputTag("");
        }
    };

    const handleTagKey = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    };

    return (
        <>
            <div>
                {tags?.length > 0 && (
                    <div className=" flex items-center gap-2 flex-wrap mt-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className=" flex items-center justify-center bg-gray-200  gap-2 px-2 rounded"
                            >
                                #{tag}
                                <button onClick={() => handleRemoveTags(tag)}>
                                    <IoCloseOutline size={20} />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className=" flex gap-2 mt-4 ">
                <input
                    type="text"
                    value={inputTag}
                    className=" block w-full px-3 py-2 border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black "
                    placeholder="tag's"
                    onChange={handleTagInputChange}
                    onKeyDown={handleTagKey}
                />
                <span className=" flex items-center">
                    <button
                        className="border px-2 py-2 border-gray-500 text-black rounded-md shadow-sm"
                        onClick={addNewTag}
                    >
                        <IoAdd />
                    </button>
                </span>
            </div>
        </>
    );
};

export default TagInput;
