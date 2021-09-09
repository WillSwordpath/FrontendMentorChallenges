import * as React from 'react'
import { useSelector } from 'react-redux'
import { deepEqual, onClickRstBtn, shallowEqual } from '../../states/funcs'
import { EInputFieldName, IInputFldControl } from '../../states/slices/tip-calculator'
import { stateType, initState } from '../../states/store'

function calcResText(input: {[i in EInputFieldName]: IInputFldControl}) {
    const bill = input.bill.value
    const tip = input.tip.value
    const people = input.people.value
    let ret: {
        tipPer: string
        totalPer: string
    }
    if (bill == null || tip == null || people == null) {
        ret = {
            tipPer: '$0.00',
            totalPer: '$0.00'
        }
    } else {
        const numTipPer = bill * tip / people
        const numTotalPer = bill * (1 + tip) / people
        ret = {
            tipPer: '$' + numTipPer.toFixed(2),
            totalPer: '$' + numTotalPer.toFixed(2)
        }
    }
    return ret
}

function resetFieldsEmpty(changed: {[i in EInputFieldName]: boolean}): boolean {
    return !changed.bill && !changed.tip && !changed.people
}

export default React.memo(function () {
    const input = useSelector((state: stateType) => ({
        bill: state.tipCalculator.inputFlds.bill,
        tip: state.tipCalculator.inputFlds.tip,
        people: state.tipCalculator.inputFlds.people
    }), deepEqual)
    const result = calcResText(input)
    const resetFieldsChanged = useSelector((state: stateType) => {
        const stateInput = state.tipCalculator.inputFlds
        const initInput = initState.tipCalculator.inputFlds
        return {
            bill: stateInput.bill.display != initInput.bill.display ||
                stateInput.bill.error != initInput.bill.error,
            tip: state.tipCalculator.slctdTipBtnIdx != initState.tipCalculator.slctdTipBtnIdx ||
                stateInput.tip.display != initInput.tip.display ||
                stateInput.tip.error != initInput.tip.error,
            people: stateInput.people.display != initInput.people.display ||
                stateInput.people.error != initInput.people.error
        }
    }, shallowEqual)
    return (
    <div className="result-box gapped-flow-ac">

        <div className="result-display-container-ac">
            <div className="result-display-c">
                <div className="-title">
                    <h3>Tip Amount</h3>
                    <p>/ person</p>
                </div>
                <div className="-dollar">
                {result.tipPer}
                </div>
            </div>
            
            <div className="result-display-c">
                <div className="-title">
                    <h3>Total</h3>
                    <p>/ person</p>
                </div>
                <div className="-dollar">
                {result.totalPer}
                </div>
            </div>
        </div>

        <button className={`reset-btn ${resetFieldsEmpty(resetFieldsChanged) ? 'empty' : ''}`}
            onClick={onClickRstBtn}
        >RESET</button>
    </div>
    )
})