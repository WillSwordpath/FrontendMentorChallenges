import * as React from 'react'
import { useSelector } from 'react-redux'
import { onInputBill, shallowEqual } from '../../../states/funcs'
import { stateType } from '../../../states/store'

export default React.memo(function () {
    const bill = useSelector((state: stateType) => state.tipCalculator.inputFlds.bill, shallowEqual)
    return (
        <div className="titled-area">
            <div className="title-with-error">
                <p>Bill</p>
                <p className="error-message">{bill.error}</p>
            </div>
            <div className="iconed-input-c">
                <img src="./images/icon-dollar.svg" alt=""></img>
                <input className={`uniform ${bill.error ? 'error' : ''}`} type="tel" placeholder="0"
                    value={bill.display}
                    onInput={onInputBill}
                ></input>
            </div>
        </div>
    )
})