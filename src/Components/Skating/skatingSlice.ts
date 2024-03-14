import { createSlice } from '@reduxjs/toolkit'
import {skatingDataMock} from "../../dataMocks/skatingDataMock";
import {RootState} from "../../redux/store";

export const skatingSlice = createSlice({
    name: 'skating',
    initialState: {
        skatingData: skatingDataMock
    },
    reducers: {

    }
})
export const selectSkating = (state: RootState) => state.skating.skatingData

export const actions = skatingSlice.actions

export default skatingSlice.reducer