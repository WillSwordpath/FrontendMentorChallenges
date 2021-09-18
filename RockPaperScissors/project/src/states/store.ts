import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { isMobile } from './device'

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
    currentScore: number
    showHelper: boolean
    contentSizes: {
        anchorPos: {
            x: number
            y: number
        } | undefined
        choiceSize: {
            sel: number
            unSel: number
        }
        resultCtn: {
            left: number
            top: number
            width: number
            height: number
        }
        playerSel: {
            top: number
            left: number
        }
        houseSel: {
            top: number
            left: number
        }
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
    chcGrpTransThunkId: undefined,
    currentScore: 3600,
    showHelper: false,
    contentSizes: {
        anchorPos: undefined,
        choiceSize: {
            sel: 90,
            unSel: 90
        },
        resultCtn: {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        },
        playerSel: {
            top: 0,
            left: 0
        },
        houseSel: {
            top: 0,
            left: 0
        }
    }
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
            }, 1000)
        })
        dispatch(setChcGrpRadius(0))
        dispatch(setChoiceSize({sel: 160}))
        return
    }
)

const slice = createSlice({
    name: 'game',
    initialState: initGameState,
    reducers: {
        setChcGrpRadius: (state, {payload}: {payload: number}) => {
            state.chcGrpRadius = payload
        },
        selectChcGrpItem: (state, {payload}: {payload: {
            sel: string | undefined
            unSelOpa: number
        }}) => {
            state.chcGrpSelected = payload.sel
            state.chcGrpUnSelOpa = payload.unSelOpa
        },
        setShowHelper: (state, {payload}: {payload: boolean}) => {
            state.showHelper = payload
        },
        updateContentSizes: (state, {payload}: {payload: {
            ctnWidth: number
            ctnHeight: number
        }}) => {
            state.contentSizes.anchorPos = {
                x: payload.ctnWidth * .5,
                y: payload.ctnHeight * .5
            }
            if (isMobile) {
                const resCtn = state.contentSizes.resultCtn
                const height = 160
                const width = payload.ctnWidth
                resCtn.top = payload.ctnHeight * .5 - height
                resCtn.left = -payload.ctnWidth * .5
                resCtn.width = width
                resCtn.height = height
                const playerSel = state.contentSizes.playerSel
                playerSel.left = payload.ctnWidth * (.25 - .5)
                playerSel.top = payload.ctnHeight * (.25 - .5)
                const houseSel = state.contentSizes.houseSel
                houseSel.left = payload.ctnWidth * (.75 - .5)
                houseSel.top = payload.ctnHeight * (.25 - .5)
            }
        },
        setChoiceSize: (state, {payload}: {payload: {
            sel?: number
            unSel?: number
        }}) => {
            Object.assign(state.contentSizes.choiceSize, payload)
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
    setChcGrpRadius,
    selectChcGrpItem,
    setShowHelper,
    updateContentSizes,
    setChoiceSize
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
