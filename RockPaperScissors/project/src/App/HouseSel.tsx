import * as React from 'react'
import { useSelector } from 'react-redux'
import { brokenRingAssets } from '../constants/broken-ring'
import { deepEqual } from '../states/funcs'
import { stateType } from '../states/store'
import Choice from './components/Choice'
import './Selection.css'

export default React.memo(function () {
    const states = useSelector((state: stateType) => ({
        anchor: state.game.layout.housePicked,
        textPos: state.game.layout.pickedTextDist,
        showHouse: state.game.layout.show.house,
        showPick: state.game.layout.show.housePick,
        picked: state.game.housePicked
    }), deepEqual)

    return <div style={{
        position: 'absolute',
        ...states.anchor,
        opacity: states.showHouse ? 1 : 0,
    }}>
        {
            brokenRingAssets.map((brc) =>
                <Choice key={brc.id}
                    selected={brc.id == states.picked}
                    ringStrokeColor={brc.start}
                    brokenRingGradId={brc.id}
                    imgSrc={brc.img}
                    house={{
                        showPick: states.showPick
                    }}
                ></Choice>
            )
        }
        <p className="pick-info" style={{
            ...states.textPos,
        }}>THE HOUSE PICKED</p>
    </div>
})