import * as React from 'react'
import Choice from './components/Choice'
import { useSelector } from 'react-redux'
import { computePositions, brokenRingAssets } from '../constants/broken-ring'
import { stateType } from '../states/store'
import './Selection.css'
import { deepEqual } from '../states/funcs'

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
    const states = useSelector((state: stateType) => ({
        centDist: state.game.layout.choiceCentDist,
        anchor: state.game.layout.playerPicked,
        textPos: state.game.layout.pickedTextDist,
        showHouse: state.game.layout.show.house,
        showPoly: state.game.layout.show.polygon,
        picked: state.game.playerPicked
    }), deepEqual)
    const itemPositions = computePositions(states.centDist)
    return <div style={{
        position: 'absolute',
        ...states.anchor,
        zIndex: 2,
    }}>
        <svg viewBox="0 0 1000 1000" width="1000" style={{
            position: 'absolute',
            left: '-500px',
            top: '-500px',
            zIndex: -1,
        }}>
            <path d={getPolygonPath(itemPositions)}
                strokeLinejoin="round" fill="none" stroke="#16223C" strokeWidth="8"
                style={{
                    transition: '.4s',
                    opacity: states.showPoly ? 1 : 0
                }}
            ></path>
        </svg>
        {
            brokenRingAssets.map((brc, idx) =>
                <Choice key={brc.id}
                    selected={states.picked == brc.id}
                    offset={itemPositions[idx]}
                    ringStrokeColor={brc.start}
                    brokenRingGradId={brc.id}
                    imgSrc={brc.img}
                ></Choice>
            )
        }
        <p className="pick-info" style={{
            ...states.textPos,
            opacity: states.showHouse ? 1 : 0,
            zIndex: states.showHouse ? 0 : -1
        }}>YOU PICKED</p>
    </div>
})