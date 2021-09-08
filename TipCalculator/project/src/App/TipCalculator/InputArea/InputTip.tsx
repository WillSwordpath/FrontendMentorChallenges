import * as React from 'react'
import { useSelector } from 'react-redux'
import { dispatch, stateType, tipCalculator } from '../../../states/store'
import { shallowEqual, onInputTip } from '../../../states/funcs'

export default React.memo(function () {
    const btns = useSelector((state: stateType) => state.tipCalculator.tipBtns, tipCalculator.tipBtnsEqual)
    const slctdBtnIdx = useSelector((state: stateType) => state.tipCalculator.slctdTipBtnIdx)
    const inputTip = useSelector((state: stateType) => state.tipCalculator.inputFlds.tip, shallowEqual)
    return (
    <div className="titled-area">
        <div className="title-with-error">
            <p>Select Tip %</p>
            <p className="error-message" id="select-tip-error"></p>
        </div>
        <div className="mixed-a-input-ac" id="select-tip">
            { 
                btns.map((btn, idx) => <button
                    key={idx}
                    onClick={ () => void dispatch(tipCalculator.slctTipBtn(idx)) }
                    className={ idx == slctdBtnIdx ? 'active' : undefined }
                >{ `${btn.value * 1e2}%` }</button>)
            }
            <input className="uniform" type="tel" placeholder="Custom"
                value={inputTip.display} onInput={onInputTip}></input>
        </div>
    </div>
    )
})