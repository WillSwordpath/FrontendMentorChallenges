import * as React from 'react'
import { useSelector } from 'react-redux'
import { onInputPeop, shallowEqual } from '../../../states/funcs'
import { stateType } from '../../../states/store'

export default React.memo(function () {
    const people = useSelector((state: stateType) => state.tipCalculator.inputFlds.people, shallowEqual)
    return (
        <div className="titled-area">
            <div className="title-with-error">
                <p>Number of People</p>
                <p className="error-message">{people.error}</p>
            </div>
            <div className="iconed-input-c">
                <img src="./images/icon-person.svg" alt=""></img>
                <input className={`uniform ${people.error ? 'error' : ''}`} type="tel" placeholder="0"
                    value={people.display}
                    onInput={onInputPeop}
                ></input>
            </div>
        </div>
    )
})