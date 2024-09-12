/** @format */

import React, { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import Model from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyNote from "../../components/EmptyNote/EmptyNote";
import NotesCard from "../../components/Notes/NotesCard";
import useGetNotes from "../../hook/useGetNotes";
import AddNotesForm from "./AddNotesForm";

const Home = ({ searchNote, setSearchNote }) => {
    const [isNotesModelOpen, setIsNotesModelOpen] = useState(false);
    const { getNotes } = useGetNotes(); // Using the custom hook

    const { user } = useSelector((store) => store.user);
    const { note } = useSelector((store) => store.note);

    // console.log("home page main note", note);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //   const cards = [
    //       {
    //           title: "Extra Covered in this video :-",
    //           points: [
    //               "Password hashing using bcrypt",
    //               "Token Login using JWT",
    //               "Login / Signup (User specific)",
    //               "Middlewares",
    //           ],
    //       },
    //       {
    //           title: "More Features Coming Soon :-",
    //           points: ["Token Expired Handling", "Better UI", "Cyclic Deployment"],
    //       },
    //       {
    //           title: "Deployment Tools :-",
    //           points: ["Vercel Deployment", "CI/CD Pipeline"],
    //       },
    //   ];

    const getDynamicBackgroundColor = (index) => {
        // An array of colors to cycle through
        const colors = ["#cbf3f0", "#ffd6ff", "#b9fbc0", "#ffbe0b", "#ff70a6", "#fcd5ce"];
        // Select a color based on the index
        return colors[index % colors.length];
    };

    // const getNotes = async () => {
    //     try {
    //         const res = await axios.get(`${serverURL}/note/all`, {
    //             withCredentials: true,
    //         });

    //         if (res.data.success) {
    //             dispatch(setAllNotes(res.data.notes));
    //             // console.log("api req is ,", res.data.notes);
    //         }
    //         // console.log("all notes is ", res);
    //     } catch (error) {
    //         toast(error.res?.data?.message);
    //         console.log("get notes error", error);
    //     }
    // };

    useEffect(() => {
        if (user === null) {
            navigate("/login");
        } else {
            getNotes();
        }
    }, []);

    return (
        <>
            <div className=" px-10 md:px-28 mt-20">
                <div className="">
                    {note.length > 0 ? (
                        <div className=" grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-4 gap-20 justify-between mt-5">
                            {note &&
                                note.map((notes, index) => (
                                    <div
                                        key={notes._id}
                                        className={`note-card flex w-fit m-auto max-w-96 justify-center h-full `}
                                        style={{ backgroundColor: getDynamicBackgroundColor(index) }}
                                    >
                                        <NotesCard
                                            index={index}
                                            title={notes.title}
                                            content={notes.content}
                                            tags={notes.tags}
                                            date={notes.createdAt}
                                            noteId={notes._id}
                                            ispinned={notes.isPinned}
                                            getNotes={getNotes}
                                        />
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <EmptyNote
                            textContent={
                                searchNote
                                    ? " sorry.? no note's found...!"
                                    : "Ready to capture your ideas? Click 'Add' to jot down your thoughts, inspirations, and reminders. Let's get started..!"
                            }
                        />
                    )}
                </div>
            </div>

            <div className=" bg-[#ff99c8] z-0 flex items-center justify-center fixed bottom-11 right-11 rounded-full w-16 h-16  ">
                <button
                    className=" text-3xl text-white ml-1 "
                    title="create a new note's"
                    onClick={() => {
                        setIsNotesModelOpen(!isNotesModelOpen);
                    }}
                >
                    <IoCreateOutline />
                </button>
            </div>
            <Model
                isOpen={isNotesModelOpen}
                onRequestClose={() => {
                    setIsNotesModelOpen(false);
                }}
                className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-gray-100 rounded-md mx-auto mt-14 p-5"
            >
                <AddNotesForm setIsNotesModelOpen={setIsNotesModelOpen} getNotes={getNotes} />
            </Model>
        </>
    );
};

export default Home;
