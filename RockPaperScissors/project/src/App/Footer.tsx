import './Footer.css'
import * as React from 'react'
import { dispatch, setShowHelper } from '../states/store'

function openHelper() {
    dispatch(setShowHelper(true))
}

export default React.memo(function () {
    return (
        <footer className="footer">
            <button className="rules-btn" onClick={openHelper}>RULES</button>
        </footer>
    )
})