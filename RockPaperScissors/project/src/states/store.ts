import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { info } from './device'

interface ISelTextDist {
    top?: number
    bottom?: number
}

export interface IGameState {
    showHelper: boolean
    currentScore: number
    selection: {
        chcGrpSelected: string | undefined
        chcGrpUnSelOpa: number
        chcGrpTransThunkId: string | undefined
    }
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
        chcGrpRadius: number
        selTextDist: ISelTextDist
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
    showHelper: false,
    currentScore: 3600,
    selection: {
        chcGrpSelected: undefined,
        chcGrpUnSelOpa: 1,
        chcGrpTransThunkId: undefined,
    },
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
        chcGrpRadius: 110,
        selTextDist: {},
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

function delay(ms: number) {
    return new Promise<void>(res => {
        setTimeout(() => void res(), ms)
    })
}

const thunkSelectChoice = createAsyncThunk('game/selectChoice',
    async (selId: string | undefined, { dispatch, getState, requestId }): Promise<void> => {
        const state = getState() as stateType
        if (state.game.selection.chcGrpTransThunkId != requestId)
            return

        dispatch(selectChcGrpItem({
            sel: selId,
            unSelOpa: 0
        }))

        await delay(1000)
        dispatch(setChcGrpRadius(0))

        return
    }
)

const slice = createSlice({
    name: 'game',
    initialState: initGameState,
    reducers: {
        setChcGrpRadius: (state, { payload }: { payload: number }) => {
            state.contentSizes.chcGrpRadius = payload
        },
        selectChcGrpItem: (state, { payload }: {
            payload: {
                sel: string | undefined
                unSelOpa: number
            }
        }) => {
            state.selection.chcGrpSelected = payload.sel
            state.selection.chcGrpUnSelOpa = payload.unSelOpa
        },
        setShowHelper: (state, { payload }: { payload: boolean }) => {
            state.showHelper = payload
        },
        updateContentSizes: (state, { payload }: {
            payload: {
                ctnWidth: number
                ctnHeight: number
            }
        }) => {
            state.contentSizes.anchorPos = {
                x: payload.ctnWidth * .5,
                y: payload.ctnHeight * .5
            }
            if (info.isMobile) {
                const resCtn = state.contentSizes.resultCtn
                const resHeight = 160
                const resWidth = payload.ctnWidth
                resCtn.top = payload.ctnHeight * .5 - resHeight
                resCtn.left = -payload.ctnWidth * .5
                resCtn.width = resWidth
                resCtn.height = resHeight

                const remainHeight = payload.ctnHeight - resHeight

                const playerSel = state.contentSizes.playerSel
                playerSel.left = payload.ctnWidth * (.27 - .5)
                playerSel.top = remainHeight * .5 - payload.ctnHeight * .5

                const houseSel = state.contentSizes.houseSel
                houseSel.left = payload.ctnWidth * (.73 - .5)
                houseSel.top = remainHeight * .5 - payload.ctnHeight * .5

                state.contentSizes.choiceSize.sel = payload.ctnWidth * .5 * .67

                const choiceRad = state.contentSizes.choiceSize.sel * .5
                state.contentSizes.selTextDist = {
                    top: choiceRad * 1.33
                }
            }
        },
        setHelperDistance: (state, { payload }: { payload: ISelTextDist }) => {
            state.contentSizes.selTextDist = payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(thunkSelectChoice.pending, (state, action) => {
                if (state.selection.chcGrpTransThunkId == undefined)
                    state.selection.chcGrpTransThunkId = action.meta.requestId
            })
            .addCase(thunkSelectChoice.fulfilled, (state, action) => {
                if (state.selection.chcGrpTransThunkId == action.meta.requestId) {
                    state.selection.chcGrpTransThunkId = undefined
                }
            })
    }
})

export const {
    setChcGrpRadius,
    selectChcGrpItem,
    setShowHelper,
    updateContentSizes,
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
