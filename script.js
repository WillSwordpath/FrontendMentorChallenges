const selTip = document.getElementById('select-tip')
const selTipBtns = selTip.getElementsByTagName('button')
for (const button of selTipBtns) {
    button.addEventListener('click', selTipBtnClickCb)
}
const selInput = selTip.getElementsByTagName('input')[0]
selInput.addEventListener('input', selInputCb)
const selInputReg = /^(\d*)(%?)$/
const selInputError = document.getElementById('select-tip-error')
const selInputErrorDefault = 'No tip selected'
selInputError.textContent = selInputErrorDefault
let tipValue
let selectedButton
function selTipBtnClickCb(event) {
    const button = event.target
    const active = button.classList.contains('active')
    if (active) {
        selectedButton = undefined
        tipValue = undefined
        turnOffSelBtn(button)
        selInputError.textContent = selInputErrorDefault
        calculateResult()
    } else {
        turnOffSelBtn(selectedButton)
        selectedButton = button
        turnOnSelBtn(button)
        selInput.value = ''
        selInputError.textContent = ''
        const match = selInputReg.exec(button.textContent)
        const num = Number(match[1]) * 1e-2
        tipValue = num
        calculateResult()
    }
}
function turnOnSelBtn(button) {
    if (!button)
        return
    button.classList.add('active')
}
function turnOffSelBtn(button) {
    if (!button)
        return
    button.classList.remove('active')
}
function resetSelectTip() {
    turnOffSelBtn(selectedButton)
    selectedButton = undefined
    tipValue = undefined
    selInput.value = ''
    selInputError.textContent = selInputErrorDefault
}
function selInputCb(event) {
    const input = event.target
    turnOffSelBtn(selectedButton)
    selectedButton = undefined
    tipValue = undefined
    if (!input.value) {
        selInputError.textContent = selInputErrorDefault
        calculateResult()
        return
    }
    const match = selInputReg.exec(input.value)
    if (!match) {
        selInputError.textContent = 'Invalid input'
        calculateResult()
        return
    }
    const num = Number(match[1])
    if (num < 0 || num > 100) {
        selInputError.textContent = 'Input out of range'
        calculateResult()
        return
    }
    tipValue = num * 1e-2
    selInputError.textContent = ''
    calculateResult()
}

const billInput = document.getElementById('bill-input')
const billError = document.getElementById('bill-error')
const billInputReg = /^[\d.]*$/
let billValue
setBillFields(null, 0)
billInput.addEventListener('input', billInputCb)
function billInputCb(event) {
    const input = event.target
    if (!input.value) {
        setBillFields(null, 0)
        calculateResult()
        return
    }
    const match = billInputReg.exec(input.value)
    if (!match) {
        setBillFields('Invalid input')
        calculateResult()
        return
    }
    const num = Number(match[0])
    if (isNaN(num)) {
        setBillFields('Invalid input')
        calculateResult()
        return
    }
    setBillFields(null, num)
    calculateResult()
}
function setBillFields(error, value) {
    if (error) {
        billError.textContent = error
        billValue = undefined
        return
    }
    billError.textContent = ''
    billValue = value
}
function resetBill() {
    setBillFields(null, 0)
    billInput.value = ''
}

const peopleInput = document.getElementById('people-input')
const peopleError = document.getElementById('people-error')
let peopleValue
setPeopleFields('Can\'t be zero')
function setPeopleFields(error, value) {
    if (error) {
        peopleError.textContent = error
        peopleValue = undefined
        return
    }
    peopleError.textContent = ''
    peopleValue = value
}
const peopleInputReg = /^\d*$/
peopleInput.addEventListener('input', peopleInputCb)
function peopleInputCb(event) {
    const input = event.target
    if (!input.value) {
        setPeopleFields('Can\'t be zero')
        calculateResult()
        return
    }
    const match = peopleInputReg.exec(input.value)
    if (!match) {
        setPeopleFields('Invalid input')
        calculateResult()
        return
    }
    const num = Number(match[0])
    if (isNaN(num)) {
        setPeopleFields('Invalid input')
        calculateResult()
        return
    }
    if (num == 0) {
        setPeopleFields('Can\'t be zero')
        calculateResult()
        return
    }
    setPeopleFields(null, num)
    calculateResult()
}
function resetPeople() {
    setPeopleFields('Can\'t be zero')
    peopleInput.value = ''
}

const tipResult = document.getElementById('result-tip')
const totalResult = document.getElementById('result-total')
const resetBtn = document.getElementById('reset-btn')
resetBtn.addEventListener('click', resetBtnCb)
function calculateResult() {
    if (!tipValue && !billInput.value && !selInput.value && !peopleInput.value) {
        resetBtn.classList.add('empty')
    } else {
        resetBtn.classList.remove('empty')
    }
    if (!billValue || !tipValue || !peopleValue) {
        tipResult.textContent = '$0.00'
        totalResult.textContent = '$0.00'
        return
    }
    const tip_person = billValue * tipValue / peopleValue
    const total_person = billValue * (1 + tipValue) / peopleValue
    tipResult.textContent = '$' + tip_person.toFixed(2)
    totalResult.textContent = '$' + total_person.toFixed(2)
}
function resetBtnCb() {
    if (resetBtn.classList.contains('empty'))
        return
    resetBill()
    resetSelectTip()
    resetPeople()
    calculateResult()
}
