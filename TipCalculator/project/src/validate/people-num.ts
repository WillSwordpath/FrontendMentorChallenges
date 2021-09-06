import {INumericValidateResult} from './_structure'

const regExp = /^\d+$/
const zeroErrMsg = 'Can\'t be zero'
const unmatchErrMsg = 'Invalid input'

export default function validate(inputVal: string): INumericValidateResult {
    const result: INumericValidateResult = {}
    if (!inputVal)
        result.errMsg = zeroErrMsg
    else {
        const match = regExp.exec(inputVal)
        if (!match)
            result.errMsg = unmatchErrMsg
        else {
            const num = Number(match[0])
            if (num == 0)
                result.errMsg = zeroErrMsg
            else
                result.result = num
        }
    }
    return result
}
