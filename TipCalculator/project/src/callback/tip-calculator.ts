import { buttonReset, inputBill, inputPeople, inputTip, selTipBtns } from "../identity/tip-calculator"
import validateBillNum from "../validate/bill-num"
import validateTipPerc from "../validate/tip-percentage"
import validatePeopleNum from '../validate/people-num'
import { setBillFields, setPeopleFields, setTipFields } from '../setter/tip-calculator'
import { tipCalculator } from "../global"
import promptResetBtnStyle from '../prompt/reset-button-style'

const validSetBillFields = () => {
    const valires = validateBillNum(inputBill.value)
    setBillFields(valires.errMsg, valires.result)
    promptResetBtnStyle()
}
inputBill.addEventListener('input', validSetBillFields)

const validSetPeopleFields = () => {
    const valires = validatePeopleNum(inputPeople.value)
    setPeopleFields(valires.errMsg, valires.result)
    promptResetBtnStyle()
}
inputPeople.addEventListener('input', validSetPeopleFields)

for (const button of selTipBtns) {
    button.addEventListener('click', () => {
        if (button == tipCalculator.tipSelectedBtn) {
            tipCalculator.UnsetTipSelectedBtn()
            const valires = validateTipPerc('')
            setTipFields(valires.errMsg, valires.result)
        } else {
            tipCalculator.SetTipSelectedBtn(button)
            inputTip.value = ''
            let btnText = button.textContent
            if (btnText == undefined)
                btnText = ''
            const valires = validateTipPerc(btnText)
            setTipFields(valires.errMsg, valires.result)
        }
        promptResetBtnStyle()
    })
}

const unsetBtnValidSetTipFields = () => {
    tipCalculator.UnsetTipSelectedBtn()
    const valires = validateTipPerc(inputTip.value)
    setTipFields(valires.errMsg, valires.result)
    promptResetBtnStyle()
}
inputTip.addEventListener('input', unsetBtnValidSetTipFields)

buttonReset.addEventListener('click', () => {
    if (buttonReset.classList.contains('empty'))
        return

    inputBill.value = ''
    validSetBillFields()
    
    inputTip.value = ''
    unsetBtnValidSetTipFields()

    inputPeople.value = ''
    validSetPeopleFields()
})
