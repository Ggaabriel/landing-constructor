import { createSlice } from "@reduxjs/toolkit";

interface Module {
    id: string;
    background: string;
    header: string;
    subHeader: string;
    textAlign: string;
    order: string;
    textColor: string;
}

export interface Template {
    id: string;
    name: string;
    local_id: string;
    modules: Module[];
    order: string;
    background: string;
    textAlign?: string;
}

export interface openState {
    template: Template[];
}

const initialState: openState = {
    template: [
        {
            id: "0",
            name: "Hello World",
            local_id: "0",
            modules: [
                {
                    id: "0",
                    background: "#fff",
                    header: "mini hello world",
                    subHeader: "hi i am betsy",
                    textAlign: "center",
                    order: "0",
                    textColor: "#abf",
                },
                {
                    id: "1",
                    background: "#fff",
                    header: "я крутой",
                    subHeader: "я маленький крутой",
                    textAlign: "center",
                    order: "1",
                    textColor: "#abf",
                },
            ],
            order: "0",
            background: "#333",
            textAlign: "center",
        },
    ],
};

export const yourSiteSlice = createSlice({
    name: "yourSite",
    initialState,
    reducers: {
        setTemp(state, action) {
            state.template = action.payload;
        },
    },
});
export const { setTemp } = yourSiteSlice.actions;
export default yourSiteSlice.reducer;
