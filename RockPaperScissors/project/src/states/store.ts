import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { info } from './device'

interface IHelperDistance {
    top?: number
    bottom?: number
}

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
    helperDistance: IHelperDistance
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
    helperDistance: {},
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
    async (selId: string | undefined, { dispatch, getState, requestId }): Promise<void> => {
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
        return
    }
)

const slice = createSlice({
    name: 'game',
    initialState: initGameState,
    reducers: {
        setChcGrpRadius: (state, { payload }: { payload: number }) => {
            state.chcGrpRadius = payload
        },
        selectChcGrpItem: (state, { payload }: {
            payload: {
                sel: string | undefined
                unSelOpa: number
            }
        }) => {
            state.chcGrpSelected = payload.sel
            state.chcGrpUnSelOpa = payload.unSelOpa
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
                state.helperDistance = {
                    top: choiceRad * 1.33
                }
            }
        },
        setHelperDistance: (state, { payload }: { payload: IHelperDistance }) => {
            state.helperDistance = payload
        },
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
