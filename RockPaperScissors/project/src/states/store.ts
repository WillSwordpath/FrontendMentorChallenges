import { configureStore, createSlice } from "@reduxjs/toolkit"

export interface IGameState {
    rulesOpen: boolean
    chcGrpOffset: {
        xPerc: number
        yPerc: number
    }
    secSize: {
        width: number | undefined
        height: number | undefined
    }
}

const initGameState: IGameState = {
    rulesOpen: false,
    chcGrpOffset: {
        xPerc: 0.5,
        yPerc: 0.5
    },
    secSize: {
        width: undefined,
        height: undefined
    }
}

const slice = createSlice({
    name: 'game',
    initialState: initGameState,
    reducers: {
        setSecSize: (state, {payload}: {payload: {
            width: number
            height: number
        }}) => {
            state.secSize = payload
        }
    }
})

export const {
    setSecSize
} = slice.actions

export const store = configureStore({
    reducer: {
        game: slice.reducer
    }
})

export const dispatch = store.dispatch.bind(store)

export const initState = store.getState()

export type stateType = typeof initState

