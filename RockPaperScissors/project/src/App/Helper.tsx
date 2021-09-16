import './Helper.css'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { dispatch, setShowHelper, stateType } from '../states/store'

function close() {
    dispatch(setShowHelper(false))
}

export default React.memo(function () {
    const show = useSelector((state: stateType) => state.game.showHelper)

    return <section className={`helper-box ${ show ? '' : 'hide' }`}>
        <div className="helper-title">
            <p>RULES</p>
            <img src="./images/icon-close.svg" className="helper-close desktop" onClick={close}></img>
        </div>
        <img src="./images/image-rules-bonus.svg" className="helper-info"></img>
        <img src="./images/icon-close.svg" className="helper-close mobile" onClick={close}></img>
    </section>
})
