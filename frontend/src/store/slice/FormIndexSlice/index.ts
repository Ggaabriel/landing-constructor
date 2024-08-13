import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface openState {
    index: number;
}

const initialState: openState = {
    index: 0,
};

export const indexSlice = createSlice({
    name: "index",
    initialState,
    reducers: {
        setIndex(state, action: PayloadAction<number>) {
            state.index = action.payload;
        },

    },
});

export const { setIndex } = indexSlice.actions;
export default indexSlice.reducer;
