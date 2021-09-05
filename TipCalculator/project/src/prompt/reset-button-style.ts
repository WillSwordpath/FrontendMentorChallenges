import gen from "./_generate"
import {
    tipCalculator
} from '../global'
import {
    inputBill,
    inputTip,
    inputPeople,
    buttonReset
} from '../identity/tip-calculator'

function update() {
    if (!tipCalculator.tipSelectedBtn && !inputBill.value && !inputTip.value && !inputPeople.value) {
        buttonReset.classList.add('empty')
    } else {
        buttonReset.classList.remove('empty')
    }
}

const prompt = gen(update)
export default prompt
