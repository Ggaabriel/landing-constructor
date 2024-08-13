import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface openState {
    title: string;
    slogan: string;
    description: string;
    tags: string[];
    cel: string;
}

const initialState: openState = {
    title: "",
    slogan: "",
    description: "",
    tags: [],
    cel: "",
};

export const blanksItemSlice = createSlice({
    name: "blanksItem",
    initialState,
    reducers: {
        setTitle(state, action) {
            state.title = action.payload;
        },
        setSlogan(state, action) {
            state.slogan = action.payload;
        },
        setDescription(state, action) {
            state.description = action.payload;
        },
        setTags(state, action: PayloadAction<string[]>) {
            state.tags = action.payload;
        },
        setCel(state, action:PayloadAction<string>) {
            state.cel = action.payload;
        },
    },
});

export const { setTitle, setSlogan, setDescription, setTags,
     setCel 
    } =
    blanksItemSlice.actions;
export default blanksItemSlice.reducer;
