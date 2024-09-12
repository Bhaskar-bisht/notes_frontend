/** @format */

import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
    name: "note",
    initialState: {
        note: [],
    },
    reducers: {
        setAllNotes: (state, action) => {
            state.note = action.payload;
        },
    },
});

export const { setAllNotes } = noteSlice.actions;
export default noteSlice.reducer;
