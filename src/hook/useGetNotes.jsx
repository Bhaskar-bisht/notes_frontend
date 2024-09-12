/** @format */

// src/hooks/useGetNotes.js

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllNotes } from "../redux/noteSlice/note.slice";
import { serverURL } from "../utils/server";

const useGetNotes = () => {
    const dispatch = useDispatch();

    const getNotes = async () => {
        try {
            const res = await axios.get(`${serverURL}/note/all`, {
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setAllNotes(res.data.notes));
                // console.log("Fetched notes:", res.data.notes);
            }
        } catch (error) {
            // toast.error(error.response?.data?.message || "Failed to fetch notes");
            console.log("Error fetching notes:", error);
        }
    };

    useEffect(() => {
        getNotes();
    }, []); // Fetch notes when the component using the hook mounts

    return { getNotes };
};

export default useGetNotes;
