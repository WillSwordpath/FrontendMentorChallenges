import './style.css'
import * as React from 'react'
import { render as reactRender } from 'react-dom'

reactRender(
    <h1>Hello React</h1>,
    document.getElementById('root')
)