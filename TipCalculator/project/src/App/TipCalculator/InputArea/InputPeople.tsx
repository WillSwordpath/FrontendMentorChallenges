import * as React from 'react'

export default React.memo(function () {
    return (
    <div className="titled-area">
        <div className="title-with-error">
            <p>Number of People</p>
            <p className="error-message" id="people-error"></p>
        </div>
        <div className="iconed-input-c">
            <img src="./images/icon-person.svg" alt=""></img>
            <input className="uniform" type="tel" placeholder="0" id="people-input"></input>
        </div>
    </div>
    )
})