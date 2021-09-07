import * as React from 'react'

export default React.memo(function () {
    return (
    <div className="input-box gapped-flow-ac">

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

        <div className="titled-area">
            <div className="title-with-error">
                <p>Select Tip %</p>
                <p className="error-message" id="select-tip-error"></p>
            </div>
            <div className="mixed-a-input-ac" id="select-tip">
                <button>5%</button>
                <button>10%</button>
                <button>15%</button>
                <button>25%</button>
                <button>50%</button>
                <input className="uniform" type="tel" placeholder="Custom"></input>
            </div>
        </div>

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
    </div>
    )
})