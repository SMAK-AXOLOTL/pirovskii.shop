import { configureStore } from '@reduxjs/toolkit'
import skisReducer from "./skisSlice";
import skiPolesReducer from './skiPolesSlice'

export const store = configureStore({
    reducer: {
        skis: skisReducer,
        skiPoles: skiPolesReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch