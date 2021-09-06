import { INumericValidateResult } from "./_structure"

const regex = /^(-?[\d.]+)(%?)$/
const noTipError = "No tip selected"
const unmatchError = "Invalid input"
const outRangeError = "Input out of range"

export default function validate(inputVal: string): INumericValidateResult {
    const res: INumericValidateResult = {}

    if (!inputVal) {
        res.errMsg = noTipError
    } else {
        const match = regex.exec(inputVal)
        if (!match) {
            res.errMsg = unmatchError
        } else {
            const num = Number(match[1])
            if (isNaN(num)) {
                res.errMsg = unmatchError
            } else if (num < -100) {
                res.errMsg = outRangeError
            } else {
                res.result = num * 1e-2
            }
        }
    }

    return res
}
