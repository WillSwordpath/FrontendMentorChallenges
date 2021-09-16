import './index.css'
import * as React from 'react'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import SVGDefs from './SVGDefs'
import Helper from './Helper'

export default React.memo(function () {
    return <>
        <SVGDefs></SVGDefs>
        <div className="app-container">
            <Header></Header>
            <Content></Content>
            <Footer></Footer>
            <Helper/>
        </div>
    </>
})