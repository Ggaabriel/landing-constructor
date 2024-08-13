import { configureStore } from '@reduxjs/toolkit'
import profile from './slice/ProfileSlice'
import isActive from './slice/ButtonSlice'
import color from './slice/ColorSlice'
import yourSite from './slice/YourSiteSlice'
import blanksItem  from './slice/BlanksItemSlice'
import edit  from './slice/EditSlice'
import formIndex from './slice/FormIndexSlice'
import user from './slice/UserSlice'
import protcedur from './slice/ProcedurSlice'

export const store = configureStore({
  reducer: {
    profile,
    isActive,
    color,
    yourSite,
    blanksItem,
    edit,
    formIndex,
    user,
    protcedur
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch