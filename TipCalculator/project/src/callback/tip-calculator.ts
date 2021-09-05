import { buttonReset, inputBill, inputPeople } from "../identity/tip-calculator"
import validateBillNum from "../validate/bill-num"
import validatePeopleNum from '../validate/people-num'
import { setBillFields, setPeopleFields } from '../setter/tip-calculator'

const onInputBill = () => {
    const valires = validateBillNum(inputBill.value)
    setBillFields(valires.errMsg, valires.result)
}
inputBill.addEventListener('input', onInputBill)

const onInputPeople = () => {
    const valires = validatePeopleNum(inputPeople.value)
    setPeopleFields(valires.errMsg, valires.result)
}
inputPeople.addEventListener('input', onInputPeople)

buttonReset.addEventListener('click', () => {
    if (buttonReset.classList.contains('empty'))
        return

    inputBill.value = ''
    onInputBill()
    
    resetSelectTip()

    inputPeople.value = ''
    onInputPeople()
})
