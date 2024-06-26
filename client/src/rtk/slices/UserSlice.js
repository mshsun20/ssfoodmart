import { createSlice } from "@reduxjs/toolkit"
const initState = []

const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        addUsr: (state, action) => {
            state.splice(0,state.length)
            state.push(action.payload)
        },
        edtUsr: (state, action) => {
            // const indx = state.findIndex((elm) => elm.item.id === action.payload.item.id)
            // state.splice(indx,1,action.payload)
        },
        rmvUsr: (state, action) => {
            const indx = state.findIndex((elm) => String(elm._id) === String(action.payload))
            state.splice(indx,1)
        },
        dltAllUsr: (state) => {
            state.splice(0,state.length)
        }
    }
})

// console.log(cartSlice.actions)

export const {addUsr, edtUsr, rmvUsr, dltAllUsr} = userSlice.actions
export default userSlice.reducer