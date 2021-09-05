import './style.css'


const selTipBtns = Array.from(selTip!.getElementsByTagName('button'))
for (const button of selTipBtns) {
    button.addEventListener('click', selTipBtnClickCb)
}
selInput.addEventListener('input', selInputCb)
const selInputErrorDefault = 'No tip selected'
let tipValue: number | undefined
let selectedButton: HTMLButtonElement | undefined
function selTipBtnClickCb(event: MouseEvent) {
    const button = event.target as HTMLButtonElement
    const active = button.classList.contains('active')
    if (active) {
        selectedButton = undefined
        tipValue = undefined
        turnOffSelBtn(button)
        selInputError!.textContent = selInputErrorDefault
        selInput.classList.add('error')
        calculateResult()
    } else {
        turnOffSelBtn(selectedButton)
        selectedButton = button
        turnOnSelBtn(button)
        selInput.value = ''
        selInputError!.textContent = ''
        const match = selInputReg.exec(button.textContent)
        const num = Number(match[1]) * 1e-2
        tipValue = num
        selInput.classList.remove('error')
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
    selInput.classList.add('error')
}
function selInputCb(event) {
    const input = event.target
    turnOffSelBtn(selectedButton)
    selectedButton = undefined
    tipValue = undefined
    selInput.classList.add('error')
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
    selInput.classList.remove('error')
    calculateResult()
}
