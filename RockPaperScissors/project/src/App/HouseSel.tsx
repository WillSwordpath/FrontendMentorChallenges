import * as React from 'react'
import { useSelector } from 'react-redux'
import { brokenRingAssets } from '../constants/broken-ring'
import { shallowEqual } from '../states/funcs'
import { stateType } from '../states/store'
import Choice from './components/Choice'
import './Selection.css'

export default React.memo(function () {
    const ctnPos = useSelector((state: stateType) => state.game.contentSizes.houseSel, shallowEqual)

    return <div style={{
        position: 'absolute',
        ...ctnPos
    }}>
        {
            brokenRingAssets.map((brc) =>
                <Choice key={brc.id}
                    ringStrokeColor={brc.start}
                    brokenRingGradId={brc.id}
                    imgSrc={brc.img}
                ></Choice>
            )
        }
        <p className="pick-info">THE HOUSE PICKED</p>
    </div>
})