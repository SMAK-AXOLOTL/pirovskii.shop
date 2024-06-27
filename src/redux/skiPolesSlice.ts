import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {skiPolesType, skiPoleType, skiPoleViewAllType} from "../utils/types";
import {skiPolesApi} from "../api/skiPolesApi";

type initialStateType = {
    skiPolesViewAllData: skiPoleViewAllType,
    skiPolesData: skiPolesType,
    skiPoleModel: skiPoleType,
    newSkiPoleData: skiPoleType,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    err: string | undefined
}

const initialStateData: initialStateType = {
    skiPolesViewAllData: [],
    skiPolesData: [],
    skiPoleModel: {
        id: '',
        name: '',
        desc: "",
        priceInRubles: 0,
        poleImgArr: [],
        lengthArray: []
    },
    newSkiPoleData: {
        id: 'new_ski_pole',
        name: 'New Ski Pole',
        desc: "",
        priceInRubles: 0,
        poleImgArr: [],
        lengthArray: []
    },
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
        clearNewSkiPoleData: (state) => {
            state.newSkiPoleData = {
                id: 'new_ski_pole',
                name: 'New Ski Pole',
                desc: "",
                priceInRubles: 0,
                poleImgArr: [],
                lengthArray: []
            }
        },
        setNewSkiPoleId: (state, action) => {
            state.newSkiPoleData.id = action.payload
        },
        setNewSkiPoleName: (state, action) => {
            state.newSkiPoleData.name = action.payload
        },
        setNewSkiPoleDesc: (state, action) => {
            state.newSkiPoleData.desc = action.payload
        },
        setNewSkiPolePriceInRubles: (state, action) => {
            state.newSkiPoleData.priceInRubles = action.payload
        },
        addNewSkiPoleImg: (state, action) => {
            state.newSkiPoleData.poleImgArr.push(action.payload)
        },
        setNewSkiPoleImg: (state, action) => {
            state.newSkiPoleData.poleImgArr[action.payload.index] = action.payload.data
        },
        deleteNewSkiPoleImgById: (state, action) => {
            state.newSkiPoleData.poleImgArr.splice(action.payload, 1)
        },
        addNewSkiPoleLength: (state) => {
            state.newSkiPoleData.lengthArray.push({lengthString: '180', isReserved: false})
        },
        setNewSkiPoleLength: (state, action) => {
            state.newSkiPoleData.lengthArray[action.payload.index] = {
                lengthString: action.payload.length,
                isReserved: action.payload.isReserved
            }
        },
        deleteNewSkiPoleLength: (state, action) => {
            state.newSkiPoleData.lengthArray.splice(action.payload, 1)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getViewAllSkiPolesData.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(getViewAllSkiPolesData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.skiPolesViewAllData = action.payload
            })
            .addCase(getViewAllSkiPolesData.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
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
            .addCase(getSkiPoleById.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getSkiPoleById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.skiPoleModel = action.payload
            })
            .addCase(getSkiPoleById.rejected, (state, action) => {
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
export const selectSkiPoles = (state: RootState) => state.skiPoles.skiPolesViewAllData
export const selectSkiPolesData = (state: RootState) => state.skiPoles.skiPolesData
export const selectSkiPoleModel = (state: RootState) => state.skiPoles.skiPoleModel
export const selectSkiPolesStatus = (state: RootState) => state.skiPoles.status
export const selectNewSkiPoleData = (state: RootState) => state.skiPoles.newSkiPoleData
export const {
    setSkiPolesStatus,
    setSkiPoleDataByIndex,
    setNewSkiPoleData,
    clearNewSkiPoleData,
    setNewSkiPoleId,
    setNewSkiPoleName,
    setNewSkiPoleDesc,
    setNewSkiPolePriceInRubles,
    addNewSkiPoleImg,
    setNewSkiPoleImg,
    deleteNewSkiPoleImgById,
    addNewSkiPoleLength,
    setNewSkiPoleLength,
    deleteNewSkiPoleLength
} = skiPolesSlice.actions

export const getViewAllSkiPolesData = createAsyncThunk('skiPoles/getViewAllSkiPolesData',
    async () => {
        return skiPolesApi.getViewAllSkiPoles()
    })
export const getAllSkiPolesData = createAsyncThunk('skiPoles/getAllSkiPolesData',
    async () => {
        return skiPolesApi.getAllSkiPoles()
    })

export const getSkiPoleById = createAsyncThunk('skiPoles/getSkiPoleById',
    async (id: string) => {
        return skiPolesApi.getSkiPoleById(id)
    }
)
export const createSkiPole = createAsyncThunk('skiPoles/createSkiPole',
    async (requestData: skiPoleType) => {
        return skiPolesApi.create(requestData)
    })

export const updateOneSkiPoleData = createAsyncThunk('skiPoles/updateOneSkiPole',
    async (requestData: {
        id: string,
        data: skiPoleType
    }) => {
        return skiPolesApi.updateOne(requestData.id, requestData.data)
    })

export const deleteSkiPoleById = createAsyncThunk('skiPoles/deleteSkiPoleById',
    async (id: string) => {
        return skiPolesApi.deleteOne(id)
    })

export default skiPolesSlice.reducer