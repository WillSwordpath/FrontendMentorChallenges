import * as React from 'react'
import InputBill from './InputBill'
import InputTip from './InputTip'
import InputPeople from './InputPeople'

export default React.memo(function () {
    return (
    <div className="input-box gapped-flow-ac">

        <InputBill></InputBill>

        <InputTip></InputTip>

        <InputPeople></InputPeople>
        
    </div>
    )
})