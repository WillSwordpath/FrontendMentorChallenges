import './style.css'
import * as React from 'react'
import { render as reactRender } from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { store } from './states/store'

reactRender(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('root')
)