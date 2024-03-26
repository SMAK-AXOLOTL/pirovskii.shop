import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {authApi} from "../api/authApi";

type initialStateType = {
    isAuth: boolean,
    accessToken: string | undefined,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    err: string | undefined
}

const initialStateData: initialStateType = {
    isAuth: false,
    accessToken: undefined,
    status: 'idle',
    err: undefined
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState: initialStateData,
    reducers: {
        setAppStateStatus: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(tryLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(tryLogin.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.isAuth = true
                console.log(action.payload)
                state.accessToken = action.payload
            })
            .addCase(tryLogin.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
    }
})
export const selectIsAuth = (state: RootState) => state.appState.isAuth
export const selectAccessToken = (state: RootState) => state.appState.accessToken
export const selectAppStateStatus = (state: RootState) => state.appState.status
export const {setAppStateStatus} = appStateSlice.actions

export const tryLogin = createAsyncThunk('appState/getAuthData', async (userData: {login: string, password: string}) => {
    return authApi.login(userData.login, userData.password)
})

export default appStateSlice.reducer