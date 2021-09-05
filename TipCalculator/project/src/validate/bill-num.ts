import {INumericValidateResult} from './_structure'

const regex = /^-?[\d.]*$/
const negativeErrMsg = 'Negative is not allowed'
const unmatchErrMsg = 'Invalid input'

export default function validate(inputVal: string): INumericValidateResult {
    const result: INumericValidateResult = {}
    if (!inputVal) {
        result.result = 0
    } else {
        const match = regex.exec(inputVal)
        if (!match) {
            result.errMsg = unmatchErrMsg
        } else {
            const num = Number(match[0])
            if (isNaN(num)) {
                result.errMsg = unmatchErrMsg
            } else {
                if (num < 0) {
                    result.errMsg = negativeErrMsg
                } else {
                    result.result = num
                }
            }
        }
    }
    return result
}
