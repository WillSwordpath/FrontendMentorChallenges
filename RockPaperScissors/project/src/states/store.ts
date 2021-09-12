import { configureStore, createSlice } from "@reduxjs/toolkit"

export interface IGameState {
    rulesOpen: boolean
    chcGrpOffset: {
        xPerc: number
        yPerc: number
    }
    chcGrpRadius: number
    chcGrpSelected: string | undefined
    chcGrpUnSelOpa: number
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
    chcGrpRadius: 110,
    chcGrpSelected: undefined,
    chcGrpUnSelOpa: 1,
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
            const minHeight = payload.width * 0.8
            // if (payload.height < minHeight)
            payload.height = minHeight
            state.secSize = payload
        },
        setChcGrpRadius: (state, {payload}: {payload: number}) => {
            state.chcGrpRadius = payload
        },
        selectChcGrpItem: (state, {payload}: {payload: {
            sel: string | undefined
            unSelOpa: number
        }}) => {
            state.chcGrpSelected = payload.sel
            state.chcGrpUnSelOpa = payload.unSelOpa
        }
    }
})

export const {
    setSecSize,
    setChcGrpRadius,
    selectChcGrpItem
} = slice.actions

export const store = configureStore({
    reducer: {
        game: slice.reducer
    }
})

export const dispatch = store.dispatch.bind(store)

export const initState = store.getState()

export type stateType = typeof initState


export function onSelectChoice(selId?: string): void {
    new Promise<void>(res => {
        dispatch(selectChcGrpItem({
            sel: selId,
            unSelOpa: 0
        }))
        setTimeout(() => {
            res()
        }, 1000)
    }).then(() => {
        dispatch(setChcGrpRadius(0))
    })
}