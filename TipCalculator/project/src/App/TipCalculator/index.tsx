import * as React from 'react'
import InputArea from './InputArea'
import ResultArea from './ResultArea'

export default React.memo(function () {
    return (
    <div className="func-container">
        <InputArea></InputArea>
        <ResultArea></ResultArea>
    </div>
    )
})