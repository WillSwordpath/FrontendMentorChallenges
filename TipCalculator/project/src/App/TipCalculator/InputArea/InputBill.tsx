import * as React from 'react'

export default React.memo(function () {
    return (
    <div className="titled-area">
        <div className="title-with-error">
            <p>Bill</p>
            <p className="error-message" id="bill-error"></p>
        </div>
        <div className="iconed-input-c">
            <img src="./images/icon-dollar.svg" alt=""></img>
            <input className="uniform" type="tel" placeholder="0" id="bill-input"></input>
        </div>
    </div>
    )
})