import * as React from 'react'
import Background from './Background'
import TipCalculator from './TipCalculator'

export default React.memo(function () {
    return (
    <div className="app-container">
        <Background></Background>
        <TipCalculator></TipCalculator>
    </div>
    )
})