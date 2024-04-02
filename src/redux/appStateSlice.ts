import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {authApi} from "../api/authApi";

type initialStateType = {
    isAuth: boolean,
    isCreateUiOpen: boolean,
    isUpdateSkiUiOpen: boolean,
    isUpdateSkiPoleUiOpen: boolean,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    err: string | undefined
}

const initialStateData: initialStateType = {
    isAuth: false,
    isCreateUiOpen: false,
    isUpdateSkiUiOpen: false,
    isUpdateSkiPoleUiOpen: false,
    status: 'idle',
    err: undefined
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState: initialStateData,
    reducers: {
        setCreateUiOpen(state) {
            state.isCreateUiOpen = !state.isCreateUiOpen
        },
        setIsUpdateSkiUiOpen(state) {
            state.isUpdateSkiUiOpen = !state.isUpdateSkiUiOpen
        },
        setIsUpdateSkiPoleUiOpen(state) {
            state.isUpdateSkiPoleUiOpen = !state.isUpdateSkiPoleUiOpen
        }

    },
    extraReducers(builder) {
        builder
            .addCase(tryLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(tryLogin.fulfilled, (state) => {
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
            .addCase(tryLogout.fulfilled, (state) => {
                state.status = 'succeeded'
                state.isAuth = false
            })
            .addCase(tryLogout.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
    }
})
export const selectIsAuth = (state: RootState) => state.appState.isAuth

export const selectIsCreateUiOpen = (state: RootState) => state.appState.isCreateUiOpen
export const selectIsUpdateSkiUiOpen = (state: RootState) => state.appState.isUpdateSkiUiOpen
export const selectIsUpdateSkiPoleUiOpen = (state: RootState) => state.appState.isUpdateSkiPoleUiOpen
export const {
    setCreateUiOpen,
    setIsUpdateSkiUiOpen,
    setIsUpdateSkiPoleUiOpen
} = appStateSlice.actions

export const tryLogin = createAsyncThunk('appState/getAuthData', async (userData: {
    login: string,
    password: string
}) => {
    return authApi.login(userData.login, userData.password)
})
export const tryLogout = createAsyncThunk('appState/logout', async () => {
    return authApi.logOut()
})

export default appStateSlice.reducer