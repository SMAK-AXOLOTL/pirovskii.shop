import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {accessoriesType, accessoriesViewAllType, accessoryType} from "../utils/types";
import {accessoriesApi} from "../api/accessoriesApi";

type initialStateType = {
    accessoriesViewAllData: accessoriesViewAllType,
    accessoriesData: accessoriesType,
    accessoryModel: accessoryType,
    newAccessoryData: accessoryType,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    err: string | undefined
}

const initialStateData: initialStateType = {
    accessoriesViewAllData: [],
    accessoriesData: [],
    accessoryModel: {
        id: '',
        name: '',
        desc: "",
        priceInRubles: 0,
        accessoriesImgArr: [],
        sizesArray: []
    },
    newAccessoryData: {
        id: 'new_accessory',
        name: 'New Accessory',
        desc: "",
        priceInRubles: 0,
        accessoriesImgArr: [],
        sizesArray: []
    },
    status: 'idle',
    err: undefined
}

export const accessoriesSlice = createSlice({
    name: 'accessories',
    initialState: initialStateData,
    reducers: {
        setAccessoriesStatus: (state, action) => {
            state.status = action.payload
        },
        setAccessoryDataByIndex: (state, action) => {
            state.accessoriesData[action.payload.index] = action.payload.data
        },
        setNewAccessoryData: (state, action) => {
            state.newAccessoryData = action.payload
        },
        clearNewAccessoryData: (state) => {
            state.newAccessoryData = {
                id: 'new_accessory',
                name: 'New Accessory',
                desc: "",
                priceInRubles: 0,
                accessoriesImgArr: [],
                sizesArray: []
            }
        },
        setNewAccessoryId: (state, action) => {
            state.newAccessoryData.id = action.payload
        },
        setNewAccessoryName: (state, action) => {
            state.newAccessoryData.name = action.payload
        },
        setNewAccessoryDesc: (state, action) => {
            state.newAccessoryData.desc = action.payload
        },
        setNewAccessoryPriceInRubles: (state, action) => {
            state.newAccessoryData.priceInRubles = action.payload
        },
        addNewAccessoryImg: (state, action) => {
            state.newAccessoryData.accessoriesImgArr.push(action.payload)
        },
        setNewAccessoryImg: (state, action) => {
            state.newAccessoryData.accessoriesImgArr[action.payload.index] = action.payload.data
        },
        deleteNewAccessoryImgById: (state, action) => {
            state.newAccessoryData.accessoriesImgArr.splice(action.payload, 1)
        },
        addNewAccessorySize: (state) => {
            state.newAccessoryData.sizesArray.push({sizeString: 'M', isReserved: false})
        },
        setNewAccessorySize: (state, action) => {
            state.newAccessoryData.sizesArray[action.payload.index] = {
                sizeString: action.payload.length,
                isReserved: action.payload.isReserved
            }
        },
        deleteNewAccessorySize: (state, action) => {
            state.newAccessoryData.sizesArray.splice(action.payload, 1)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getViewAllAccessoriesData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getViewAllAccessoriesData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accessoriesViewAllData = action.payload
            })
            .addCase(getViewAllAccessoriesData.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(getAllAccessoriesData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllAccessoriesData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accessoriesData = action.payload
            })
            .addCase(getAllAccessoriesData.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(getAccessoryById.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAccessoryById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accessoryModel = action.payload
            })
            .addCase(getAccessoryById.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(createAccessory.pending, (state) => {
            state.status = 'loading'
            })
            .addCase(createAccessory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accessoriesData = action.payload
            })
            .addCase(createAccessory.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(updateOneAccessoryData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateOneAccessoryData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accessoriesData = action.payload
            })
            .addCase(updateOneAccessoryData.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
            .addCase(deleteAccessoryById.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteAccessoryById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accessoriesData = action.payload
            })
            .addCase(deleteAccessoryById.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message
            })
    }
})
export const selectAccessories = (state: RootState) => state.accessories.accessoriesViewAllData
export const selectAccessoriesData = (state: RootState) => state.accessories.accessoriesData
export const selectAccessoryModel = (state: RootState) => state.accessories.accessoryModel
export const selectAccessoriesStatus = (state: RootState) => state.accessories.status
export const selectNewAccessoryData = (state: RootState) => state.accessories.newAccessoryData
export const {
    setAccessoriesStatus,
    setAccessoryDataByIndex,
    setNewAccessoryData,
    clearNewAccessoryData,
    setNewAccessoryId,
    setNewAccessoryName,
    setNewAccessoryDesc,
    setNewAccessoryPriceInRubles,
    addNewAccessoryImg,
    setNewAccessoryImg,
    deleteNewAccessoryImgById,
    addNewAccessorySize,
    setNewAccessorySize,
    deleteNewAccessorySize
} = accessoriesSlice.actions

export const getViewAllAccessoriesData = createAsyncThunk('accessories/getViewAllAccessoriesData',
    async () => {
        return accessoriesApi.getViewAllAccessories()
    })
export const getAllAccessoriesData = createAsyncThunk('accessories/getAllAccessoriesData',
    async () => {
        return accessoriesApi.getAllAccessories()
    })

export const getAccessoryById = createAsyncThunk('accessories/getAccessoryById',
    async (id: string) => {
        return accessoriesApi.getAccessoryById(id)
    }
)
export const createAccessory = createAsyncThunk('accessories/createAccessory',
    async (requestData: accessoryType) => {
        return accessoriesApi.create(requestData)
    })

export const updateOneAccessoryData = createAsyncThunk('accessories/updateOneAccessory',
    async (requestData: {
        id: string,
        data: accessoryType
    }) => {
        return accessoriesApi.updateOne(requestData.id, requestData.data)
    })

export const deleteAccessoryById = createAsyncThunk('accessories/deleteAccessoryById',
    async (id: string) => {
        return accessoriesApi.deleteOne(id)
    })

export default accessoriesSlice.reducer