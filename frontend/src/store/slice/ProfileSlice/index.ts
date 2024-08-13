import { createSlice } from '@reduxjs/toolkit'

export interface openState {
    firstName:string,
    lastName:string,
    avatar:string,
    birthday:string,
    phone:string,
    bio:string,
    status:string
}

const initialState: openState = {
    firstName:"Kitty",
    lastName:"Sweety",
    avatar:"user.jpg",
    birthday:"01 Декабрь 2023",
    phone:"+7-911-120-88-88",
    bio:"sweet kitty, i like sleep on faces and make horse sounds at night",
    status:"студент"
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  },
})

export default profileSlice.reducer