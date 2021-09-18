import * as React from 'react'
import { useSelector } from 'react-redux'
import { shallowEqual } from '../states/funcs'
import { stateType } from '../states/store'
import './Result.css'

export default React.memo(function () {
    const ctnSize = useSelector((state: stateType) => state.game.contentSizes.resultCtn, shallowEqual)
    return <div style={{
        position: 'absolute',
        top: ctnSize.top,
        left: ctnSize.left,
        width: ctnSize.width,
        height: ctnSize.height
    }} className="result-box">
        <p className="result-text">YOU WIN</p>
        <button className="again-btn">PLAY AGAIN</button>
    </div>
})