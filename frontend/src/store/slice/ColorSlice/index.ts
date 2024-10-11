import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface openState {
    colorHex: any;
    opacity:string
}

const initialState: openState = {
    colorHex: null,
    opacity: "",
};



export const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {
        setColor(state, action: PayloadAction<string>) {
            state.colorHex = action.payload;
        },
        addOpacity(state, action: PayloadAction<string>) {
            state.opacity = action.payload;
        },
    },
});

export const { setColor, addOpacity } = colorSlice.actions;
export default colorSlice.reducer;
