import * as React from 'react'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import SVGDefs from './SVGDefs'

export default React.memo(function () {
    return <>
        <SVGDefs></SVGDefs>
        <div className="app-container">
            <Header></Header>
            <Content></Content>
            <Footer></Footer>
        </div>
    </>
})