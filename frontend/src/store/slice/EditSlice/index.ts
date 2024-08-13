import { getModuleById, getProjectById, getTemplateById } from "@/src/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Template {
    name: string;
    background_color: string;
    text_color: string;
    text_align: string;
    scheme: string;
    background_type: string;
    procedure_background: {
        background_color: string;
        blur: number;
        color: string;
        count: number;
        speed: number;
    };
    ID: string;
    modules: IModule[];
    project: string;
}
export interface IModule{
    background_color: string,
    header_text: string,
    subheader_text: string,
    text_align: string,
    text_color: string,
    ID: string,
    template: string
  }
export interface openState {
    modules:IModule[];
    templates: Template[];
    activeId: string;
    activeIndex: number;
    isLoading: boolean;
}

const initialState: openState = {
    modules:[],
    templates: [],
    activeId: "",
    activeIndex: 0,
    isLoading: false,
    
};

interface IgetProjectWithTemplatesByIdThunk {
    projectId: string;
}
export const getProjectWithTemplatesByIdThunk = createAsyncThunk(
    `user/getUserWithProjectsThunk`,
    async (payload: IgetProjectWithTemplatesByIdThunk, thunkAPI) => {
        thunkAPI.dispatch(setIsLoading(true));
        try {
            // Выполните асинхронную операцию (например, HTTP-запрос)
            const data = await getProjectById(payload.projectId); // Используйте await для ожидания результата getUser()

            const fetchingTemplates = await Promise.all(
                data.templates.map(async (templateId: string) => {
                    return await getTemplateById(templateId);
                })
            );

            thunkAPI.dispatch(setTemp(fetchingTemplates));
            thunkAPI.dispatch(setIsLoading(false));
        } catch (error) {
            // Обработка ошибок, если они возникнут
            console.error("Ошибка:", error);
            throw error;
        }
    }
);
interface getTemplatesWithModulesByIdThunk {
    templateId:string
}
export const getTemplatesWithModulesByIdThunk = createAsyncThunk(
    `user/getUserWithProjectsThunk`,
    async (payload: getTemplatesWithModulesByIdThunk, thunkAPI) => {
        thunkAPI.dispatch(setIsLoading(true));
        try {
            // Выполните асинхронную операцию (например, HTTP-запрос)
            const data = await getTemplateById(payload.templateId); // Используйте await для ожидания результата getUser()

            const fetchingModules = await Promise.all(
                data.modules.map(async (moduleId: string) => {
                    return await getModuleById(moduleId);
                })
            );

            thunkAPI.dispatch(setModules(fetchingModules));
            thunkAPI.dispatch(setIsLoading(false));
        } catch (error) {
            // Обработка ошибок, если они возникнут
            console.error("Ошибка:", error);
            throw error;
        }
    }
);
export const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        setTemp(state, action) {
            state.templates = action.payload;
        },
        setActiveId(state, action) {
            state.activeId = action.payload;
        },
        setActiveIndexEdit(state, action) {
            state.activeIndex = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setModules(state, action) {
            state.modules = action.payload;
        },
    },
});

export const { setTemp, setActiveId, setActiveIndexEdit, setIsLoading, setModules } =
    editSlice.actions;
export default editSlice.reducer;
