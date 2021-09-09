import { createSlice } from "@reduxjs/toolkit"
import valiTipPerc from "../../validate/tip-percentage"


export interface ITipBtnControl {
    value: number
}

export interface IInputFldControlUpdate {
    value?: number
    display?: string
    error?: string
}

export interface IInputFldControl extends IInputFldControlUpdate {
    display: string
}

export enum EInputFieldName {
    bill = 'bill',
    tip = 'tip',
    people = 'people'
}

export interface ITipCalculatorState {
    inputFlds: {
        [EInputFieldName.bill]: IInputFldControl
        [EInputFieldName.tip]: IInputFldControl
        [EInputFieldName.people]: IInputFldControl
    }
    slctdTipBtnIdx?: number
    tipBtns: ITipBtnControl[]
}

const initialState: ITipCalculatorState = {
    inputFlds: {
        bill: { display: '' },
        tip: { display: '' },
        people: { display: '' },
    },
    tipBtns: [
        { value: 5e-2 },
        { value: 10e-2 },
        { value: 15e-2 },
        { value: 25e-2 },
        { value: 50e-2 },
    ]
}

export const tipBtnsEqual = (left: ITipBtnControl[], right: ITipBtnControl[]): boolean =>
    left.length == right.length &&
    left.reduce(
        (sum: boolean, one, idx) => sum && one.value == right[idx].value,
        true)

const emptyTipValiRes = valiTipPerc('')

const slice = createSlice({
    name: 'tipCalculator',
    initialState,
    reducers: {
        slctTipBtn: (state, { payload }: { payload: number | undefined }) => {
            if (state.slctdTipBtnIdx == payload) {
                state.slctdTipBtnIdx = undefined
            } else {
                state.slctdTipBtnIdx = payload
            }
            if (state.slctdTipBtnIdx != undefined) {
                state.inputFlds.tip = {
                    display: '',
                    value: state.tipBtns[state.slctdTipBtnIdx].value
                }
            } else {
                state.inputFlds.tip = {
                    error: emptyTipValiRes.errMsg,
                    value: emptyTipValiRes.result,
                    display: ''
                }
            }
        },
        setInputFld: (state, { payload }: {
            payload: {
                name: EInputFieldName
                update: IInputFldControlUpdate
            }
        }) => {
            Object.assign(state.inputFlds[payload.name], payload.update)
            switch (payload.name) {
                case EInputFieldName.tip:
                    state.slctdTipBtnIdx = undefined
                    break
            }
        }
    }
})

export const {
    slctTipBtn,
    setInputFld
} = slice.actions

export const tipCalculatorReducer = slice.reducer
