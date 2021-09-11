import * as React from 'react'
import Choice from './components/Choice'
import './Content.css'
import { computePositions, brokenRingAssets } from '../constants/broken-ring'

const centerDistance = 110

export default React.memo(function () {
    const pos = computePositions(centerDistance)
    return (
        <section className="content">
            <span className="choice-group-anchor">
                {
                    brokenRingAssets.map((brc, idx) =>
                        <Choice offset={pos[idx]}
                        ringStrokeColor={brc.start}
                        brokenRingGradId={brc.id}
                        imgSrc={brc.img}
                        ></Choice>
                    )
                }
            </span>
        </section>
    )
})