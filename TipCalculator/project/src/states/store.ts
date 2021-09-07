import { configureStore } from '@reduxjs/toolkit'
import { tipCalculatorReducer } from './slices/tip-calculator'

export const store = configureStore({
    reducer: {
        tipCalculator: tipCalculatorReducer
    }
})

export const initState = store.getState()

export type stateType = typeof initState

export * as tipCalculator from './slices/tip-calculator'
