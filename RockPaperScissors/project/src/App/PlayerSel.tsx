import * as React from 'react'
import Choice from './components/Choice'
import { useSelector } from 'react-redux'
import { computePositions, brokenRingAssets } from '../constants/broken-ring'
import { stateType } from '../states/store'
import './Selection.css'
import { shallowEqual } from '../states/funcs'

function getPolygonPath(ary: { x: number, y: number }[], offset: { x: number, y: number } = { x: 500, y: 500 }): string {
    const len = ary.length
    if (len < 3)
        return ''
    let str = ''
    for (let i = 0; i < len; i++) {
        const cur = ary[i]
        switch (i) {
            case 0:
                str += `M${offset.x + cur.x} ${offset.y + cur.y}`
                break
            case len - 1:
                str += `L${offset.x + cur.x} ${offset.y + cur.y}z`
                break
            default:
                str += `L${offset.x + cur.x} ${offset.y + cur.y}`
        }
    }
    return str
}

export default React.memo(function () {
    const centerDistance = useSelector((state: stateType) => state.game.chcGrpRadius)
    const itemPos = computePositions(centerDistance)
    const ctnPos = useSelector((state: stateType) => state.game.contentSizes.playerSel, shallowEqual)
    const textPos = useSelector((state: stateType) => state.game.helperDistance, shallowEqual)

    return <div style={{
        position: 'absolute',
        ...ctnPos
    }}>
        <svg viewBox="0 0 1000 1000" width="1000" style={{
            position: 'absolute',
            left: '-500px',
            top: '-500px',
        }}>
            <path d={getPolygonPath(itemPos)} strokeLinejoin="round" fill="none" stroke="#16223C" strokeWidth="8" style={{
                transition: '.4s'
            }}></path>
        </svg>
        {
            brokenRingAssets.map((brc, idx) =>
                <Choice key={brc.id}
                    offset={itemPos[idx]}
                    ringStrokeColor={brc.start}
                    brokenRingGradId={brc.id}
                    imgSrc={brc.img}
                ></Choice>
            )
        }
        <p className="pick-info" style={{
            ...textPos
        }}>YOU PICKED</p>
    </div>
})