import * as React from 'react'

export default React.memo(function () {
    return (
        <svg style={{
            position: 'absolute',
            width: '0',
            height: '0'
        }}>
            <defs>
                <linearGradient id="broken-ring-orange" x1="0" x2="0" y1=".5" y2="1.06">
                <stop offset=".7" stop-color="orange" />
                <stop offset="1" stop-color="#A14D00" />
                </linearGradient>
            </defs>
        </svg>
    )
})