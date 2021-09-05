import validate from "./bill-num"
import {INumericValidateResult} from './_structure'

const negativeInputResult: INumericValidateResult = {
    errMsg: "Negative is not allowed",
}

const invalidInputResult: INumericValidateResult = {
    errMsg: "Invalid input"
}

describe('validate-bill-num', function() {

    it('validates empty string', function() {
        expect(validate('')).toEqual({result: 0})
    })

    it('validates 0', function() {
        expect(validate('0')).toEqual({result: 0})
        expect(validate('-.0')).toEqual({result: -0})
        expect(validate('-0.000')).toEqual({result: -0})
    })

    it('validates positive', function() {
        expect(validate('.112')).toEqual({result: .112})
        expect(validate('54.6')).toEqual({result: 54.6})
        expect(validate('73.265')).toEqual({result: 73.265})
    })

    it('validates negative', function() {
        expect(validate('-.112')).toEqual(negativeInputResult)
        expect(validate('-4.6')).toEqual(negativeInputResult)
        expect(validate('-0.2')).toEqual(negativeInputResult)
    })

    it('validates invalid inputs', function() {
        expect(validate('abc')).toEqual(invalidInputResult)
        expect(validate('x')).toEqual(invalidInputResult)
        expect(validate('2+1')).toEqual(invalidInputResult)
        expect(validate('80%')).toEqual(invalidInputResult)
        expect(validate('.8.8')).toEqual(invalidInputResult)
        expect(validate('--8')).toEqual(invalidInputResult)
    })
})
