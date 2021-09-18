import * as React from 'react'
import { useSelector } from 'react-redux'
import { deepEqual, shallowEqual } from '../../states/funcs'
import { onSelectChoice, stateType } from '../../states/store'
import './Choice.css'

// css determined size
const intrinsicWidth = 200
const invIntrWidth = 1 / intrinsicWidth
function getScale(sizeInPixel: number) {
    return sizeInPixel * invIntrWidth
}

export default React.memo(function ({ imgSrc, brokenRingGradId, ringStrokeColor, offset = {
    x: 0,
    y: 0
}}: {
    imgSrc: string
    ringStrokeColor: string
    brokenRingGradId: string
    offset?: {
        x: number
        y: number
    }
}) {
    const select = useSelector((state: stateType) => ({
        id: state.game.chcGrpSelected,
        opacity: state.game.chcGrpSelected == brokenRingGradId ? 1 : state.game.chcGrpUnSelOpa
    }), shallowEqual)
    const thisSelected = select.id == brokenRingGradId
    const choiceSize = useSelector((state: stateType) => state.game.contentSizes.choiceSize, shallowEqual)
    return (
        <span className="choice-anchor" style={{
            left: offset.x + 'px',
            top: offset.y + 'px',
            transition: '.5s',
            zIndex: thisSelected ? 1 : 0
        }}>
            <div className="choice-box" onClick={onSelectChoice.bind(undefined, brokenRingGradId)} style={{
                opacity: select.opacity,
                transition: '.5s',
                transform: `scale(${ thisSelected ? getScale(choiceSize.sel) : getScale(choiceSize.unSel) })`
            }}>
                <svg viewBox="0 0 100 100" className="choice-ring">
                    <circle cx="50" cy="50" r="45" fill="none" stroke={ringStrokeColor} strokeWidth="10"></circle>
                </svg>
                <svg viewBox="0 0 100 50" className="choice-broke">
                    <circle cx="50" cy="0" r="45" fill="none" stroke={`url('#${brokenRingGradId}')`} strokeWidth="10"></circle>
                </svg>
                <img src={imgSrc} alt="" className="choice-img" />
            </div>
        </span>
    )
}, (prev, next) => {
    return deepEqual(prev, next)
})
