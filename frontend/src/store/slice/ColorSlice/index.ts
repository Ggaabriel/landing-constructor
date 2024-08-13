import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface openState {
    ColorHex: any;
    opacity:string
}

const initialState: openState = {
    ColorHex: null,
    opacity: "",
};



export const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {
        setColor(state, action: PayloadAction<string>) {
            state.ColorHex = action.payload;
        },
        addOpacity(state, action: PayloadAction<string>) {
            state.opacity = action.payload;
        },
    },
});

export const { setColor, addOpacity } = colorSlice.actions;
export default colorSlice.reducer;
