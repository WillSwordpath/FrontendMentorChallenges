import * as React from 'react'

export default React.memo(function () {
    return (
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
    )
})