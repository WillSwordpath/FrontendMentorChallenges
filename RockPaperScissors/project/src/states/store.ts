import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface IGameState {
    rulesOpen: boolean
    chcGrpOffset: {
        xPerc: number
        yPerc: number
    }
    chcGrpRadius: number
    chcGrpSelected: string | undefined
    chcGrpUnSelOpa: number
    chcGrpTransThunkId: string | undefined
    secSize: {
        width: number | undefined
        height: number | undefined
    }
    currentScore: number
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
    chcGrpTransThunkId: undefined,
    secSize: {
        width: undefined,
        height: undefined
    },
    currentScore: 0
}



const thunkSelectChoice = createAsyncThunk('game/selectChoice',
    async (selId: string | undefined, {dispatch, getState, requestId}): Promise<void> => {
        const state = getState() as stateType
        if (state.game.chcGrpTransThunkId != requestId)
            return
        await new Promise<void>(res => {
            dispatch(selectChcGrpItem({
                sel: selId,
                unSelOpa: 0
            }))
            setTimeout(() => {
                res()
            }, 3000)
        })
        dispatch(setChcGrpRadius(0))
        console.log('setting radius to 0') // TODO delete this line
        return
    }
)

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
    },
    extraReducers: builder => {
        builder
        .addCase(thunkSelectChoice.pending, (state, action) => {
            if (state.chcGrpTransThunkId == undefined)
                state.chcGrpTransThunkId = action.meta.requestId
        })
        .addCase(thunkSelectChoice.fulfilled, (state, action) => {
            if (state.chcGrpTransThunkId == action.meta.requestId) {
                state.chcGrpTransThunkId = undefined
            }
        })
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


export const onSelectChoice = (selId?: string) => void dispatch(thunkSelectChoice(selId))
