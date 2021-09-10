import * as React from 'react'

export default React.memo(function () {
    return <header className="header">
        <div className="logo-score-box">
            <img src="./images/logo-bonus.svg" alt="Rock Paper Scissors" className="logo" />
            <div className="score-box">
                <p>SCORE</p>
                <p className="score">12</p>
            </div>
        </div>
    </header>
})