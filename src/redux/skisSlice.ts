import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {skisApi} from '../api/skisApi'
import {skiModel, skiType} from "../utils/types";
import {skiTypeEnum} from "../utils/skiTypeEnum";

type initialStateType = {
    skiData: skiType,
    newSkiData: skiModel,
    currentOpenedSkiIndex: number,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    err: string | undefined
}

const initialStateData: initialStateType = {
    skiData: [],
    newSkiData: {
        id: 'new_ski_id',
        name: "New Ski Name",
        desc: "Описание модели лыж",
        priceInRubles: 0,
        type: skiTypeEnum.CLASSIC,
        skiImg: '',
        hardTrack: [],
        universalTrack: []
    },
    currentOpenedSkiIndex: 0,
    status: 'idle',
    err: undefined
}

export const skisSlice = createSlice({
    name: 'skis',
    initialState: initialStateData,
    reducers: {
        setCurrentOpenedSkiIndex: (state, action) => {
          state.currentOpenedSkiIndex = action.payload
        },
        setSkiStatus: (state, action) => {
            state.status = action.payload
        },
        setSkiDataByIndex: (state, action) => {
            state.skiData[action.payload.index] = action.payload.data
        },
        setNewSkiData: (state, action) => {
            state.newSkiData = action.payload
        },
        clearNewSkiData: (state) => {
          state.newSkiData = {
              id: 'new_ski_id',
              name: "New Ski Name",
              desc: "",
              priceInRubles: 0,
              type: skiTypeEnum.CLASSIC,
              skiImg: '',
              hardTrack: [],
              universalTrack: []
          }
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
        setNewSkiDesc: (state, action) => {
            state.newSkiData.desc = action.payload
        },
        setNewSkiPriceInRubles: (state, action) => {
            state.newSkiData.priceInRubles = action.payload
        },
        setNewSkiImg: (state, action) => {
            state.newSkiData.skiImg = action.payload
        },
        setNewSkiHardTrack: (state, action) => {
            state.newSkiData.hardTrack = action.payload
        },
        addNewSkiHardTrack: (state, action) => {
            state.newSkiData.hardTrack.push({
                lengthString: action.payload === '' ? '180' : action.payload,
                weights: [{weightString: '75-80', isReserved: false}]
            })
        },
        setNewSkiUniTrack: (state, action) => {
            state.newSkiData.universalTrack = action.payload
        },
        addNewSkiUniTrack: (state, action) => {
            state.newSkiData.universalTrack.push({
                lengthString: action.payload === '' ? '180' : action.payload,
                weights: [{weightString: '75-80', isReserved: false}]
            })
        },
        addNewSkiHardTrackWeight: (state, action) => {
            state.newSkiData.hardTrack.find((t) => t.lengthString === action.payload)
                ?.weights.push({weightString: '75-80', isReserved: false})
        },
        setNewSkiHardTrackWeight: (state, action) => {
            state.newSkiData.hardTrack[action.payload.track].weights[action.payload.index] = {
                weightString: action.payload.weight,
                isReserved: action.payload.isReserved
            }
        },
        deleteNewSkiHardTrackWeight: (state, action) => {
            state.newSkiData.hardTrack[action.payload.track].weights.splice(action.payload.index, 1)
        },
        addNewSkiUniTrackWeight: (state, action) => {
            state.newSkiData.universalTrack.find((t) => t.lengthString === action.payload)
                ?.weights.push({weightString: '75-80', isReserved: false})
        },
        setNewSkiUniTrackWeight: (state, action) => {
            state.newSkiData.universalTrack[action.payload.track].weights[action.payload.index] = {
                weightString: action.payload.weight,
                isReserved: action.payload.isReserved
            }
        },
        deleteNewSkiUniTrackWeight: (state, action) => {
            state.newSkiData.universalTrack[action.payload.track].weights.splice(action.payload.index, 1)
        }
    },
    extraReducers(builder) {
        builder
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
export const selectClassicSkis = createSelector(selectSkis, (skis) => {
    return skis.filter(ski => ski.type === skiTypeEnum.CLASSIC)
})
export const selectSkatingSkis = createSelector(selectSkis, (skis) => {
    return skis.filter(ski => ski.type === skiTypeEnum.SKATING)
})
export const selectSkiStatus = (state: RootState) => state.skis.status
export const selectNewSkiData = (state: RootState) => state.skis.newSkiData
export const selectCurrentOpenedSkiIndex = (state: RootState) => state.skis.currentOpenedSkiIndex
export const {
    setCurrentOpenedSkiIndex,
    setSkiStatus,
    setSkiDataByIndex,
    setNewSkiData,
    clearNewSkiData,
    setNewSkiId,
    setNewSkiType,
    setNewSkiName,
    setNewSkiDesc,
    setNewSkiPriceInRubles,
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

export const getAllSkisData = createAsyncThunk('skis/getAllSkisData',
    async () => {
        return skisApi.getAllSkis()
    })
export const createSki = createAsyncThunk('skis/createSki',
    async (requestData: skiModel) => {
        return skisApi.create(requestData)
    })
export const updateOneSkiData = createAsyncThunk('skis/updateOneSkiData',
    async (requestData: {
        id: string,
        data: skiModel
    }) => {
        return skisApi.updateOne(requestData.id, requestData.data)
    })

export const deleteSkiById = createAsyncThunk('skis/deleteSkiById',
    async (id: string) => {
        return skisApi.deleteOne(id)
    })

export default skisSlice.reducer