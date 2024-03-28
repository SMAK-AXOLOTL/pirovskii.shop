import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {skiPolesType, skiPoleType} from "../utils/types";
import {skiPolesApi} from "../api/skiPolesApi";

type initialStateType = {
    skiPolesData: skiPolesType,
    newSkiPoleData: skiPoleType,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    err: string | undefined
}

const initialStateData: initialStateType = {
    skiPolesData: [],
    newSkiPoleData: {id: '', name: '', poleImg: '', lengthArray: []},
    status: 'idle',
    err: undefined
}

export const skiPolesSlice = createSlice({
    name: 'skiPoles',
    initialState: initialStateData,
    reducers: {
        setSkiPolesStatus: (state, action) => {
            state.status = action.payload
        },
        setSkiPoleDataByIndex: (state, action) => {
            state.skiPolesData[action.payload.index] = action.payload.data
        },
        setNewSkiPoleData: (state, action) => {
            state.newSkiPoleData = action.payload
        },
        setNewSkiPoleId: (state, action) => {
            state.newSkiPoleData.id = action.payload
        },
        setNewSkiPoleName: (state, action) => {
            state.newSkiPoleData.name = action.payload
        },
        setNewSkiPoleImg: (state, action) => {
            state.newSkiPoleData.poleImg = action.payload
        },
        addNewSkiPoleLength: (state) => {
            state.newSkiPoleData.lengthArray.push({lengthString: '160', isReserved: false})
        },
        setNewSkiPoleLength: (state, action) => {
            state.newSkiPoleData.lengthArray[action.payload.index] = {lengthString: action.payload.length, isReserved: action.payload.isReserved}
        },
        deleteNewSkiPoleLength: (state, action) => {
            state.newSkiPoleData.lengthArray.splice(action.payload, 1)
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
            .addCase(updateOneSkiPoleData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateOneSkiPoleData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.skiPolesData = action.payload
            })
            .addCase(updateOneSkiPoleData.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(deleteSkiPoleById.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteSkiPoleById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.skiPolesData = action.payload
            })
            .addCase(deleteSkiPoleById.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
    }
})
export const selectSkiPoles = (state: RootState) => state.skiPoles.skiPolesData
export const selectSkiPolesStatus = (state: RootState) => state.skiPoles.status
export const selectNewSkiPoleData = (state: RootState) => state.skiPoles.newSkiPoleData
export const {
    setSkiPolesStatus,
    setSkiPoleDataByIndex,
    setNewSkiPoleData,
    setNewSkiPoleId,
    setNewSkiPoleName,
    setNewSkiPoleImg,
    addNewSkiPoleLength,
    setNewSkiPoleLength,
    deleteNewSkiPoleLength
} = skiPolesSlice.actions

export const getAllSkiPolesData = createAsyncThunk('skiPoles/getAllSkiPolesData', async () => {
    return skiPolesApi.getAllSkiPoles()
})

export const createSkiPole = createAsyncThunk('skiPoles/createSkiPole', async (requestData: skiPoleType) => {
    return skiPolesApi.create(requestData)
})

export const updateOneSkiPoleData = createAsyncThunk('skiPoles/updateOneSkiPole', async (requestData: {
    id: string,
    data: skiPoleType
}) => {
    return skiPolesApi.updateOne(requestData.id, requestData.data)
})

export const deleteSkiPoleById = createAsyncThunk('skiPoles/deleteSkiPoleById', async (id: string) => {
    return skiPolesApi.deleteOne(id)
})
export default skiPolesSlice.reducer