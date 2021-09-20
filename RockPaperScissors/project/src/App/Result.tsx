import * as React from 'react'
import { useSelector } from 'react-redux'
import { shallowEqual } from '../states/funcs'
import { stateType } from '../states/store'
import './Result.css'

export default React.memo(function () {
    const shape = useSelector((state: stateType) => ({
        ...state.game.layout.resultBox,
        opacity: state.game.layout.show.result ? 1 : 0
    }), shallowEqual)
    return <div style={{
        position: 'absolute',
        ...shape
    }} className="result-box">
        <p className="result-text">YOU WIN</p>
        <button className="again-btn">PLAY AGAIN</button>
    </div>
})