describe('Async function block', function() {
    let foo
    beforeEach(function(done) {
        jasmine.clock().install()
        setTimeout(function() {
            foo = 1
            done()
        }, 30000)
        jasmine.clock().tick(30001)
    })
    afterEach(function() {
        jasmine.clock().uninstall()
    })
    it('should block and set foo as 1', function(done) {
        setTimeout(function() {
            done()
        }, 3000)
        expect(foo).toEqual(jasmine.any(Number))
        jasmine.clock().tick(2999 + 1)
    })
})