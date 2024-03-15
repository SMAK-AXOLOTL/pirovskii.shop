import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {skisApi} from '../api/skisApi'
import {skiType} from "../utils/types";

type initialStateType = {
    skiData: skiType,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    err: string | undefined
}

const initialStateData: initialStateType = {
    skiData: {},
    status: 'idle',
    err: undefined
}

export const skisSlice = createSlice({
    name: 'skis',
    initialState: initialStateData,
    reducers: {
        setSkiData: (state, action) => {
            state.skiData =  action.payload
        },
        setSkiStatus: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getClassicData.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getClassicData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.skiData = action.payload
            })
            .addCase(getClassicData.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(getSkatingData.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getSkatingData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.skiData = action.payload
            })
            .addCase(getSkatingData.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
    }
})
export const selectSkis = (state: RootState) => state.skis.skiData
export const selectSkiStatus = (state: RootState) => state.skis.status
export const {setSkiData, setSkiStatus} = skisSlice.actions

export const getClassicData = createAsyncThunk('skis/getClassicData', async () => {
    return skisApi.getAllClassic()
})
export const getSkatingData = createAsyncThunk('skis/getSkatingData', async () => {
    return skisApi.getAllSkating()
})

export default skisSlice.reducer