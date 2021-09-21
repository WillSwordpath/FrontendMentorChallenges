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

export default React.memo(function ({ imgSrc, brokenRingGradId, ringStrokeColor, selected, offset = {
    x: 0,
    y: 0
}, house }: {
    imgSrc: string
    ringStrokeColor: string
    brokenRingGradId: string
    offset?: {
        x: number
        y: number
    }
    selected: boolean
    house?: {
        showPick: boolean
    }
}) {
    const choiceProp = useSelector((state: stateType) => ({
        ...state.game.layout.choiceDiam,
        showUnS: state.game.layout.show.unS
    }), shallowEqual)
    let opacity: number, scale: number
    if (house == undefined) {
        opacity = selected || choiceProp.showUnS ? 1 : 0
        scale = selected ? getScale(choiceProp.sel) : getScale(choiceProp.unS)
    } else {
        opacity = selected && house.showPick ? 1 : 0
        scale = selected && house.showPick ? getScale(choiceProp.sel) : getScale(choiceProp.unS)
    }
    return (
        <span className="choice-anchor" style={{
            left: offset.x,
            top: offset.y,
            transition: '.5s',
            zIndex: selected ? 1 : 0
        }}>
            <div className="choice-box" onClick={
                house == undefined ? onSelectChoice.bind(undefined, brokenRingGradId) : undefined
            } style={{
                opacity,
                transition: '.5s',
                transform: `scale(${scale})`
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
