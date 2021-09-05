import { tipCalculator } from '../global'
import { errorBill, errorPeople, inputBill, inputPeople } from '../identity/tip-calculator'
import promptTipResult from '../prompt/tip-calc-result'

export function setBillFields(error?: string, value?: number): void {
    if (error) {
        errorBill.textContent = error
        inputBill.classList.add('error')
        tipCalculator.bill = undefined
    } else {
        errorBill.textContent = ''
        inputBill.classList.remove('error')
        tipCalculator.bill = value
    }
    promptTipResult()
}

export function setPeopleFields(error?: string, value?: number): void {
    if (error) {
        errorPeople.textContent = error
        inputPeople.classList.add('error')
        tipCalculator.people = undefined
    } else {
        errorPeople.textContent = ''
        inputPeople.classList.remove('error')
        tipCalculator.people = value
    }
    promptTipResult()
}
