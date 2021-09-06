import validate from "./people-num";
import {INumericValidateResult} from './_structure'

const zeroInputResult: INumericValidateResult = {
    errMsg: "Can't be zero",
}

const invalidInputResult: INumericValidateResult = {
    errMsg: "Invalid input"
}

describe('validate-people-num', function() {

    it('validates empty string', function() {
        expect(validate('')).toEqual(zeroInputResult)
    })

    it('validates 0', function() {
        expect(validate('0')).toEqual(zeroInputResult)
    })

    it('validates decimals', function() {
        expect(validate('10')).toEqual({result: 10})
        expect(validate('112')).toEqual({result: 112})
        expect(validate('546')).toEqual({result: 546})
        expect(validate('050')).toEqual({result: 50})
        expect(validate('00800')).toEqual({result: 800})
    })

    it('validates invalid inputs', function() {
        expect(validate('-11')).toEqual(invalidInputResult)
        expect(validate('-55')).toEqual(invalidInputResult)
        expect(validate('abc')).toEqual(invalidInputResult)
        expect(validate('2+1')).toEqual(invalidInputResult)
        expect(validate('80%')).toEqual(invalidInputResult)
        expect(validate('80.4')).toEqual(invalidInputResult)

        // expect(validate('80')).toEqual(invalidInputResult)  // intended test failure
    })
})
