import * as React from 'react'
import Background from './Background'
import TipCalculator from './TipCalculator'
// import { useSelector } from 'react-redux'
// import { dispatch, stateType, tipCalculator } from '../states/store'

export default React.memo(function () {
    // const title = useSelector((state: stateType) => state.tipCalculator.title)
    return <div className="app-container">
        <Background></Background>
        <TipCalculator></TipCalculator>
    </div>
})