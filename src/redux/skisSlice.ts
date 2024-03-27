import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {skisApi} from '../api/skisApi'
import {skiModelType, skiType} from "../utils/types";
import {skiTypeEnum} from "../utils/skiTypeEnum";

type initialStateType = {
    skiData: skiType,
    newSkiData: skiModelType,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    err: string | undefined
}

const initialStateData: initialStateType = {
    skiData: [],
    newSkiData: {id: '', type: skiTypeEnum.CLASSIC, name: '', skiImg: '', hardTrack: [], universalTrack: []},
    status: 'idle',
    err: undefined
}

export const skisSlice = createSlice({
    name: 'skis',
    initialState: initialStateData,
    reducers: {
        setSkiStatus: (state, action) => {
            state.status = action.payload
        },
        setNewSkiId: (state, action) => {
            state.newSkiData.id = action.payload
        },
        setNewSkiType: (state, action) => {
            state.newSkiData.type = action.payload
        },
        setNewSkiName: (state, action) => {
            state.newSkiData.name = action.payload
        },
        setNewSkiImg: (state, action) => {
            state.newSkiData.skiImg = action.payload
        },
        setNewSkiHardTrack: (state, action) => {
            state.newSkiData.hardTrack = action.payload
        },
        setNewSkiUniTrack: (state, action) => {
            state.newSkiData.universalTrack = action.payload
        },
        addNewSkiHardTrack: (state, action) => {
            state.newSkiData.hardTrack.push(action.payload)
        },
        addNewSkiUniTrack: (state, action) => {
            state.newSkiData.universalTrack.push(action.payload)
        },
        addNewSkiHardTrackWeight: (state, action) => {
            state.newSkiData.hardTrack.find((t) => t.lengthString === action.payload)
                ?.weights.push({
                weightString: '60-65',
                isReserved: false
                }
            )
        },
        addNewSkiUniTrackWeight: (state, action) => {
            state.newSkiData.universalTrack.find((t) => t.lengthString === action.payload)
                ?.weights.push({
                weightString: '60-65',
                isReserved: false
                }
            )
        },
        setNewSkiHardTrackWeight: (state, action) => {
            state.newSkiData.hardTrack[action.payload.track].weights[action.payload.index] = {weightString: action.payload.weight, isReserved: action.payload.isReserved}
        },
        setNewSkiUniTrackWeight: (state, action) => {
            state.newSkiData.universalTrack[action.payload.track].weights[action.payload.index] = {weightString: action.payload.weight, isReserved: action.payload.isReserved}
        },
        deleteNewSkiHardTrackWeight: (state, action) => {
            state.newSkiData.hardTrack[action.payload.track].weights.splice(action.payload.index, 1)
        },
        deleteNewSkiUniTrackWeight: (state, action) => {
            state.newSkiData.hardTrack[action.payload.track].weights.splice(action.payload.index, 1)
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getClassicData.pending, (state) => {
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
            .addCase(getSkatingData.pending, (state) => {
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
            .addCase(getAllSkisData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllSkisData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.skiData = action.payload
            })
            .addCase(getAllSkisData.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(deleteSkiById.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteSkiById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.skiData = action.payload
            })
            .addCase(deleteSkiById.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(updateOneSkiData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateOneSkiData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.skiData = action.payload
            })
            .addCase(updateOneSkiData.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(createSki.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createSki.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.skiData = action.payload
            })
            .addCase(createSki.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
    }
})
export const selectSkis = (state: RootState) => state.skis.skiData
export const selectSkiStatus = (state: RootState) => state.skis.status
export const selectNewSkiData = (state: RootState) => state.skis.newSkiData
export const {
    setSkiStatus,
    setNewSkiId,
    setNewSkiType,
    setNewSkiName,
    setNewSkiImg,
    setNewSkiUniTrack,
    setNewSkiHardTrack,
    addNewSkiHardTrack,
    addNewSkiUniTrack,
    addNewSkiHardTrackWeight,
    addNewSkiUniTrackWeight,
    setNewSkiHardTrackWeight,
    setNewSkiUniTrackWeight,
    deleteNewSkiUniTrackWeight,
    deleteNewSkiHardTrackWeight
} = skisSlice.actions

export const getClassicData = createAsyncThunk('skis/getClassicData', async () => {
    return skisApi.getAllClassic()
})
export const getSkatingData = createAsyncThunk('skis/getSkatingData', async () => {
    return skisApi.getAllSkating()
})

export const getAllSkisData = createAsyncThunk('skis/getAllSkisData', async () => {
    return skisApi.getAllSkis()
})
export const createSki = createAsyncThunk('skis/createSki', async (requestData: skiModelType) => {
    return skisApi.create(requestData)
})
export const updateOneSkiData = createAsyncThunk('skis/updateOneSkiData', async (requestData: {
    id: string,
    data: skiModelType
}) => {
    return skisApi.updateOne(requestData.id, requestData.data)
})

export const deleteSkiById = createAsyncThunk('skis/deleteSkiById', async (id: string) => {
    return skisApi.deleteOne(id)
})

export default skisSlice.reducer