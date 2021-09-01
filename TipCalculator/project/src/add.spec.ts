import {add} from './add'

it('should give the right result', function() {
    let res = add(5, 5)
    expect(res).toBe(10)
})