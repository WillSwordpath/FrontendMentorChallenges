import * as React from 'react'

export default React.memo(function () {
    return (
    <div className="result-box gapped-flow-ac">

        <div className="result-display-container-ac">
            <div className="result-display-c">
                <div className="-title">
                    <h3>Tip Amount</h3>
                    <p>/ person</p>
                </div>
                <div className="-dollar" id="result-tip">
                $0.00
                </div>
            </div>
            
            <div className="result-display-c">
                <div className="-title">
                    <h3>Total</h3>
                    <p>/ person</p>
                </div>
                <div className="-dollar" id="result-total">
                $0.00
                </div>
            </div>
        </div>

        <button className="reset-btn empty" id="reset-btn">RESET</button>
    </div>
    )
})