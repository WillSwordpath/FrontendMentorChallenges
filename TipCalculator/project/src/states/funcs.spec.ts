import { deepEqual } from "./funcs"

describe('deep-equal', function () {
    it('should equal', function () {
        expect(deepEqual([1,2,[1,2,[3]]], [1,2,[1,2,[3]]])).toBe(true)
    })

    it('should inequal', function () {
        expect(deepEqual([1,2,[1,2,[3]]], [1,2,[1,2,[0]]])).toBe(false)
    })

    it('should inequal', function () {
        expect(deepEqual([1,2,[1,2,[3]]], [1,2,[1,2]])).toBe(false)
    })
})
