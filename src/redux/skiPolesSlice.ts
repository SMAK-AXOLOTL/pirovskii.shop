import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {api} from '../api/api'
import {skiPolesType} from "../utils/types";

type initialStateType = {
    skiPolesData: skiPolesType,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    err: string | undefined
}

const initialStateData: initialStateType = {
    skiPolesData: [],
    status: 'idle',
    err: undefined
}

export const skiPolesSlice = createSlice({
    name: 'skiPoles',
    initialState: initialStateData,
    reducers: {
        setSkiPolesStatus: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllSkiPolesData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllSkiPolesData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.skiPolesData = action.payload
            })
            .addCase(getAllSkiPolesData.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
    }
})
export const selectSkiPoles = (state: RootState) => state.skiPoles.skiPolesData
export const selectSkiPolesStatus = (state: RootState) => state.skiPoles.status
export const {setSkiPolesStatus} = skiPolesSlice.actions

export const getAllSkiPolesData = createAsyncThunk('skis/getAllSkiPolesData', async () => {
    return api.getAllSkiPoles()
})

export default skiPolesSlice.reducer