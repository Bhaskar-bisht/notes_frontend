/** @format */

import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { VscEdit } from "react-icons/vsc";
import Model from "react-modal";
import { toast } from "react-toastify";
import useGetNotes from "../../hook/useGetNotes";
import EditNote from "../../pages/Home/EditNote";
import { serverURL } from "../../utils/server";

const NotesCard = ({ title, date, content, tags, noteId, ispinned, index }) => {
    // const [isPin, setIsPin] = useState(ispinned);
    const [noteEditModel, setNoteEditModel] = useState(false);
    const { getNotes } = useGetNotes(); // Using the custom hook

    // console.log("note id in notes card", noteId);

    const getDynamicCornerBgColor = (index) => {
        // An array of colors to cycle through
        const colors = ["#ffafcc", "#00b4d8", "#003566", "#70d6ff", "#ff5714", "#2a9d8f"];
        // const index = Math.floor(Math.random() * colors.length);
        return colors[index % colors.length];
        // Select a color based on the index
    };

    const handlePinChange = async () => {
        // setIsPin(!isPin);
        try {
            const res = await axios.put(
                `${serverURL}/note/update-note-pinned/${noteId}`,
                { isPinned: !ispinned },
                {
                    withCredentials: true,
                }
            );

            console.log("pin change res is :", res);

            if (res.data.success) {
                toast.success(res.data.message);
                getNotes();
            }
        } catch (error) {
            console.log("pin note error ", error);
            toast.error(error.response.data.message);
        }
    };

    // const getDynamicPinBgColor = () => {
    //     const colors = ["#ff595e", "#43aa8b", "#70d6ff", "#ff70a6", "#bee1e6", "#90e0ef"];

    //     const index = Math.floor(Math.random() * colors.length);

    //     // Select a color based on the index
    //     return colors[index % colors.length];
    // };

    const editNoteHandler = () => {
        setNoteEditModel(true);
    };

    const handleDeleteNote = async () => {
        try {
            const res = await axios.delete(`${serverURL}/note/delete/${noteId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                getNotes();
                toast.success(res.data.message);
            }
            // console.log("delete note res", res);
        } catch (error) {
            toast.error(error.response.data.message);
            // console.log("delete note error ", error);
        }
    };

    return (
        <>
            <div className="relative w-full px-8 py-8 min-w-48 rounded-lg shadow-lg">
                {/* Pin icon */}
                {/* <i className="fas fa-thumbtack pin-icon absolute" style={{ color: getDynamicCornerBgColor() }}></i> */}

                {ispinned ? (
                    <MdPushPin
                        size={30}
                        className="pin-icon absolute cursor-pointer"
                        style={{ color: getDynamicCornerBgColor(index) }}
                        onClick={handlePinChange}
                    />
                ) : (
                    <MdOutlinePushPin
                        size={30}
                        className="pin-icon absolute cursor-pointer"
                        style={{ color: getDynamicCornerBgColor(index) }}
                        onClick={handlePinChange}
                    />
                )}

                {/* <MdOutlinePushPin
                    size={30}
                    className="pin-icon absolute"
                    style={{ color: getDynamicCornerBgColor() }}
                /> */}
                {/* <MdPushPin size={30} className="pin-icon absolute" style={{ color: getDynamicCornerBgColor() }} /> */}
                <div className=" mb-4 flex flex-col">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className=" text-sm">{moment(date).format("Do-MMM-YYYY")}</p>
                </div>
                <div className="list-disc list-inside space-y-2 overflow-y-auto scroll_bar max-h-48">
                    <p>{content}</p>

                    <div className="  py-2">
                        <ul>
                            <li>
                                <span className=" font-bold">{tags && tags.map((tag) => `#${tag} `)}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className=" flex  absolute right-4 top-2">
                    <span className=" rounded-full p-1">
                        <VscEdit
                            size={20}
                            className=" cursor-pointer"
                            onClick={() => {
                                editNoteHandler(noteId);
                            }}
                        />
                        <Model
                            isOpen={noteEditModel}
                            onRequestClose={() => {
                                setNoteEditModel(false);
                            }}
                            className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4  bg-gray-100 rounded-md mx-auto mt-14 p-5"
                        >
                            <EditNote
                                setNoteEditModel={setNoteEditModel}
                                title={title}
                                content={content}
                                tag={tags}
                                noteId={noteId}
                                getNotes={getNotes}
                            />
                        </Model>
                    </span>
                    <span className=" rounded-full p-1">
                        <AiOutlineDelete size={20} className=" cursor-pointer" onClick={handleDeleteNote} />
                    </span>
                </div>

                <div
                    className="absolute corner-fold w-20 h-6"
                    style={{ backgroundColor: getDynamicCornerBgColor(index) }}
                ></div>
            </div>
        </>
    );
};

export default NotesCard;
