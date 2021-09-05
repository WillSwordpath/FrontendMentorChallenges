export const inputBill = document.getElementById('bill-input') as HTMLInputElement
export const errorBill = document.getElementById('bill-error') as HTMLParagraphElement

export const selectTip = document.getElementById('select-tip') as HTMLDivElement
export const selTipBtns = Array.from(selectTip.getElementsByTagName('button'))
export const inputTip = selectTip.getElementsByTagName('input')[0]
export const errorTip = document.getElementById('select-tip-error') as HTMLParagraphElement

export const inputPeople = document.getElementById('people-input') as HTMLInputElement
export const errorPeople = document.getElementById('people-error') as HTMLParagraphElement

export const tipPerPerson = document.getElementById('result-tip') as HTMLDivElement
export const totalPerPerson = document.getElementById('result-total') as HTMLDivElement
export const buttonReset = document.getElementById('reset-btn') as HTMLButtonElement

