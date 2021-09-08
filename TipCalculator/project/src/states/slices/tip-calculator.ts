import { createSlice } from "@reduxjs/toolkit"

interface ITipBtnControl {
    value: number
}

interface ITipCalculatorState {
    slctdTipBtnIdx?: number
    tipBtns: ITipBtnControl[]
}

const initialState: ITipCalculatorState = {
    tipBtns: [
        { value: 5e-2 },
        { value: 10e-2 },
        { value: 15e-2 },
        { value: 25e-2 },
        { value: 50e-2 },
    ]
}

const slice = createSlice({
    name: 'tipCalculator',
    initialState,
    reducers: {
        slctTipBtn: (state, action: { payload: number }) => {
            if (state.slctdTipBtnIdx == action.payload) {
                state.slctdTipBtnIdx = undefined
            } else {
                state.slctdTipBtnIdx = action.payload
            }
        }
    }
})

export const {
    slctTipBtn,
} = slice.actions

export const tipCalculatorReducer = slice.reducer
