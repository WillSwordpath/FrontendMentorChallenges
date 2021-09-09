import './styles/root.css'
import './styles/global.css'
import './styles/app-bg-logo.css'
import './styles/func-container.css'
import './styles/input-box.css'
import './styles/result-box.css'
import './styles/titled-area.css'
import './styles/input-uniform.css'
import './styles/iconed-input-c.css'
import './styles/mixed-a-input-ac.css'

import * as React from 'react'
import { render as reactRender } from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './states/store'

reactRender(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('root')
)