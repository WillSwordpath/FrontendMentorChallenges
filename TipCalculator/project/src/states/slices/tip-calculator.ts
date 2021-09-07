import { createSlice } from "@reduxjs/toolkit"

interface ITipCalculatorState {
    title: string
}

const initialState: ITipCalculatorState = {
    title: "Great React-Redux",
}

const slice = createSlice({
    name: 'tipCalculator',
    initialState,
    reducers: {
        hideInitTitle: state => {
            state.title = 'Centralized State Management'
        },
        showInitTitle: (state, action: { payload: number }) => {
            state.title = initialState.title + ' ' + action.payload
        }
    }
})

export const {
    hideInitTitle,
    showInitTitle
} = slice.actions

export const tipCalculatorReducer = slice.reducer
