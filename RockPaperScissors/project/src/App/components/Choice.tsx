import * as React from 'react'
import './Choice.css'

export default React.memo(function ({ imgSrc, brokenRingGradId, ringStrokeColor, offset }: {
    imgSrc: string
    ringStrokeColor: string
    brokenRingGradId: string
    offset: {
        x: number
        y: number
    }
}) {
    return (
        <span className="choice-anchor" style={{
            left: offset.x + 'px',
            top: offset.y + 'px'
        }}>
            <div className="choice-box">
                <svg viewBox="0 0 100 100" className="choice-ring">
                    <circle cx="50" cy="50" r="45" fill="none" stroke={ringStrokeColor} strokeWidth="10"></circle>
                </svg>
                <svg viewBox="0 0 100 50" className="choice-broke">
                    <circle cx="50" cy="0" r="45" fill="none" stroke={`url('#${brokenRingGradId}')`} strokeWidth="10"></circle>
                </svg>
                ,<img src={imgSrc} alt="" className="choice-img" />
            </div>
        </span>
    )
})