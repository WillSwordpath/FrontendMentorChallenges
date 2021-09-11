import * as React from 'react'
import { brokenRingAssets } from '../../constants/broken-ring'

export default React.memo(function () {
    return (
        <svg style={{
            position: 'absolute',
            width: '0',
            height: '0'
        }}>
            <defs>
                {
                    brokenRingAssets.map(brc =>
                        <linearGradient id={brc.id} x1="0" x2="0" y1=".5" y2="1.06">
                        <stop offset=".7" stop-color={brc.start} />
                        <stop offset="1" stop-color={brc.end} />
                        </linearGradient>
                    )
                }
            </defs>
        </svg>
    )
})