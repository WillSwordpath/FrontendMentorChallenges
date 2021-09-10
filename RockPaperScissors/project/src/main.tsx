import './styles/root.css'
import './styles/global.css'
import './styles/app.css'
import './styles/header.css'
import './styles/content.css'
import './styles/footer.css'
import './styles/choice.css'

import * as React from 'react'
import { render } from 'react-dom'
import App from './App'

render(
    <App></App>
    , document.getElementById('root')
)