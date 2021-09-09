import { EInputFieldName, setInputFld, slctTipBtn } from "./slices/tip-calculator"
import valiBill from '../validate/bill-num'
import valiTipPerc from '../validate/tip-percentage'
import valiPeopNum from '../validate/people-num'
import { FormEvent } from "react"
import { dispatch, initState } from "./store"


export interface IIndexableObject {
    [index: string]: any
}

export function shallowEqual(objLeft: IIndexableObject, objRight: IIndexableObject): boolean {
    const keysLeft = Object.keys(objLeft)
    const keysRight = Object.keys(objRight)
    if (keysLeft.length !== keysRight.length) {
        return false
    }
    for (let key of keysLeft) {
        if (objLeft[key] !== objRight[key]) {
            return false
        }
    }
    return true
}

export function deepEqual(objLeft: IIndexableObject, objRight: IIndexableObject): boolean {
    const keysLeft = Object.keys(objLeft)
    const keysRight = Object.keys(objRight)
    if (keysLeft.length !== keysRight.length) {
        return false
    }
    for (let key of keysLeft) {
        const curLeft = objLeft[key]
        const curRight = objRight[key]
        if (typeof curLeft == 'object') {
            if (typeof curRight != 'object')
                return false
            else if (!deepEqual(curLeft, curRight))
                return false
        } else {
            if (typeof curRight == 'object')
                return false
            else if (curLeft !== curRight)
                return false
        }
    }
    return true
}


const inputFieldValiFuncs = {
    [EInputFieldName.bill]: valiBill,
    [EInputFieldName.tip]: valiTipPerc,
    [EInputFieldName.people]: valiPeopNum
}

function onFieldInput(field: EInputFieldName, ev: FormEvent<HTMLInputElement>): void {
    const input = ev.target as HTMLInputElement
    const valiRes = inputFieldValiFuncs[field](input.value)
    dispatch(setInputFld({
        name: field,
        update: {
            display: input.value,
            value: valiRes.result,
            error: valiRes.errMsg,
        }
    }))
}

export const onInputBill = onFieldInput.bind(undefined, EInputFieldName.bill)
export const onInputTip = onFieldInput.bind(undefined, EInputFieldName.tip)
export const onInputPeop = onFieldInput.bind(undefined, EInputFieldName.people)

export function onClickRstBtn() {
    dispatch(setInputFld({
        name: EInputFieldName.bill,
        update: initState.tipCalculator.inputFlds.bill
    }))
    dispatch(setInputFld({
        name: EInputFieldName.tip,
        update: initState.tipCalculator.inputFlds.tip
    }))
    dispatch(setInputFld({
        name: EInputFieldName.people,
        update: initState.tipCalculator.inputFlds.people
    }))
}
