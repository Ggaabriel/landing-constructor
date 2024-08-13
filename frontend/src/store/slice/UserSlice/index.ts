import { getProjectById, getUserById } from '@/src/axios'
import { IuserProjects } from '@/src/pages/Projects'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface user {
  user:openState
  userProjects:IuserProjects[]
  isLoading:boolean,
  activeIndex:number
}

export interface openState {
    telegramID: string,
    phone_number: string,
    birthday: string,
    first_name: string,
    last_name: string,
    projects: string[],
    bio:string,
    status:string,

}

const initialState: user = {
  isLoading:false,
  activeIndex:0,
  user:{
    telegramID: "",
    phone_number: "",
    birthday: "",
    first_name: "",
    last_name: "",
    bio:'',
    status:"",
    projects: []
  },
  userProjects:[

  ]
    
}

interface IgetUserWithProjectsByIdThunk {
  userId:string
}
export const getUserWithProjectsByIdThunk = createAsyncThunk(`user/getUserWithProjectsThunk`, async (payload:IgetUserWithProjectsByIdThunk, thunkAPI)=> {
  thunkAPI.dispatch(setIsLoading(true));
  try {
    // Выполните асинхронную операцию (например, HTTP-запрос)
    const { user } = await getUserById(payload.userId); // Используйте await для ожидания результата getUser()
                
   thunkAPI.dispatch(setUser(await user));              
    const fetchingProjects = await Promise.all(
        user.projects.map(async (projectId: string) => {
            return await getProjectById(projectId);
        })
    );
   
    thunkAPI.dispatch(setUserProjects(fetchingProjects));

    thunkAPI.dispatch(setIsLoading(false));
  } catch (error) {
    // Обработка ошибок, если они возникнут
    console.error('Ошибка:', error);
    throw error;
  }
})
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
        state.user = action.payload;
    },
    setUserProjects(state, action) {
      state.userProjects = action.payload;
  },
  setIsLoading(state, action) {
    state.isLoading = action.payload;
},
setActiveIndex(state, action) {
  state.activeIndex = action.payload;
},
  
  },
})
export const { setUser, setUserProjects,setIsLoading, setActiveIndex } = userSlice.actions;
export default userSlice.reducer