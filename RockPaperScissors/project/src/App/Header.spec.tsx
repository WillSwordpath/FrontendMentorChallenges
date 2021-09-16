import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import Header from './Header'
import * as ReactRedux from 'react-redux'

/** 
 * A trivial example of writing React tests, which is believed not that helpful.
 */

describe('Header', function () {

    jest.mock('react-redux')

    let container: HTMLDivElement | undefined;
    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })
    afterEach(() => {
        // @ts-ignore
        document.body.removeChild(container)
        container = undefined
    })

    it('can render the score', () => {
        const spy = jest.spyOn(ReactRedux, 'useSelector')
        spy.mockImplementation(() => 10)

        act(() => {
            ReactDOM.render(
                // @ts-ignore
                <Header />,
                container)
        })

        const para = container!.querySelector('[data-testid=score]')
        expect(para).toBeTruthy()
        expect(para!.textContent).toBe('10')

        spy.mockRestore()
    })
})
