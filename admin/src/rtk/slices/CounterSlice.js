import { createSlice } from "@reduxjs/toolkit"

const initState = {value:1}

const counterSlice = createSlice({
    name: 'counter',
    initialState:initState,
    reducers: {
        cntrInc: (state, action) => {
            state.value += 1
        },
        cntrDec: (state) => {
            if (state.value > 1) {
                state.value -= 1
            }
            else {
                state.value = 1
            }
        },
        cntClr: (state) => {
            state.value = 1
        }
    }
})

export const {cntrInc, cntrDec, cntClr} = counterSlice.actions
export default counterSlice.reducer