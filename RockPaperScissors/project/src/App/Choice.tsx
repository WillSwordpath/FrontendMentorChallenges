import * as React from 'react'

export default React.memo(function () {
    return (
        <div className="choice-box">
            <svg viewBox="0 0 100 100" className="choice-ring">
                <circle cx="50" cy="50" r="45" fill="none" stroke="orange" stroke-width="10"></circle>
            </svg>
            <svg viewBox="0 0 100 50" className="choice-broke">
                <circle cx="50" cy="0" r="45" fill="none" stroke="url('#broken-ring-orange')" stroke-width="10"></circle>
            </svg>
        </div>
    )
})