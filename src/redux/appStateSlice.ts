import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {authApi} from "../api/authApi";
import {retry} from "@reduxjs/toolkit/query";

type initialStateType = {
    isAuth: boolean,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    err: string | undefined
}

const initialStateData: initialStateType = {
    isAuth: false,
    status: 'idle',
    err: undefined
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState: initialStateData,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(tryLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(tryLogin.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.isAuth = true
            })
            .addCase(tryLogin.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(tryLogout.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(tryLogout.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.isAuth = false
            })
            .addCase(tryLogout.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(checkAuth.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.isAuth = true
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = 'failed'
                state.isAuth = false
                state.err = action.error.message
            })
    }
})
export const selectIsAuth = (state: RootState) => state.appState.isAuth

export const tryLogin = createAsyncThunk('appState/getAuthData', async (userData: {login: string, password: string}) => {
    return authApi.login(userData.login, userData.password)
})
export const checkAuth = createAsyncThunk('appState/checkAuth', async () => {
    return authApi.checkAuth()
})
export const tryLogout = createAsyncThunk('appState/logout', async () =>{
    return authApi.logOut()
})

export default appStateSlice.reducer