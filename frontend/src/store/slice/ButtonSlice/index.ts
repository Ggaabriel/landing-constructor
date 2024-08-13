import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface openState {
    valueModal: boolean;
    valueButton: boolean;
}

const initialState: openState = {
    valueModal: false,
    valueButton: true

};

export const buttonSlice = createSlice({
    name: "button",
    initialState,
    reducers: {
        setActive(state, action:PayloadAction<boolean>) {
            state.valueModal = action.payload;
        },
        setActiveButton(state, action:PayloadAction<boolean>) {
            state.valueButton = action.payload;
        },
    },
});

export const { setActive, setActiveButton } = buttonSlice.actions;
export default buttonSlice.reducer;
