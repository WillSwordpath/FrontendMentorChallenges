import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { EContentState, IContentLayout, IObservation, IObservationUpdate, layout } from "./layout"

export interface IGameState {
    showHelper: boolean
    currentScore: number
    playerPicked: string | undefined
    housePicked: string | undefined
    transitionID: string | undefined
    observed: IObservation
    layout: IContentLayout
}

const initGameState: IGameState = {
    showHelper: false,
    currentScore: 3600,
    playerPicked: undefined,
    housePicked: undefined,
    transitionID: undefined,
    observed: {
        isMobile: false,
        obWidth: 0,
        obHeight: 0,
        state: EContentState.unselected
    },
    layout: {
        anchor: undefined,
        choiceCentDist: 0,
        choiceDiam: {
            sel: 0,
            unS: 0,
        },
        resultBox: {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
        },
        pickedTextDist: {},
        playerPicked: {
            left: 0,
            top: 0,
        },
        housePicked: {
            left: 0,
            top: 0,
        },
        show: {
            polygon: false,
            unS: false,
            house: false,
            housePick: false,
            result: false
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
        if (state.game.transitionID != requestId)
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
        playerPick: (state, { payload }: {
            payload:  string | undefined
        }) => {
            state.playerPicked = payload
        },
        housePick: (state, { payload }: {
            payload:  string | undefined
        }) => {
            state.housePicked = payload
        },
        setShowHelper: (state, { payload }: { payload: boolean }) => {
            state.showHelper = payload
        },
        updateLayout: (state, { payload }: { payload: IObservationUpdate }) => {
            Object.assign(state.observed, payload)
            state.layout = layout(state.observed)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(thunkSelectChoice.pending, (state, action) => {
                if (state.transitionID == undefined)
                    state.transitionID = action.meta.requestId
            })
            .addCase(thunkSelectChoice.fulfilled, (state, action) => {
                if (state.transitionID == action.meta.requestId) {
                    state.transitionID = undefined
                }
            })
    }
})

export const {
    setShowHelper,
    playerPick,
    housePick,
    updateLayout
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
