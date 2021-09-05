import gen from './_generate'
import {
    tipPerPerson,
    totalPerPerson
} from '../identity/tip-calculator'
import {
    tipCalculator
} from '../global'

const update = () => {
    const {
        bill,
        tip,
        people
    } = tipCalculator
    if (bill == null || tip == null || people == null) {
        tipPerPerson.textContent = '$0.00'
        totalPerPerson.textContent = '$0.00'
        return
    }
    const tip_person = bill * tip / people
    const total_person = bill * (1 + tip) / people
    tipPerPerson.textContent = '$' + tip_person.toFixed(2)
    totalPerPerson.textContent = '$' + total_person.toFixed(2)
}

const prompt = gen(update)
export default prompt
