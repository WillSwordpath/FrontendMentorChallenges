import './Header.css'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { stateType } from '../states/store'

export default React.memo(function () {
    const score = useSelector((state: stateType) => state.game.currentScore)
    return <header className="header">
        <div className="logo-score-box">
            <img src="./images/logo-bonus.svg" alt="Rock Paper Scissors" className="logo" />
            <div className="score-box">
                <p>SCORE</p>
                <p className="score" data-testid="score">{score.toString()}</p>
            </div>
        </div>
    </header>
})