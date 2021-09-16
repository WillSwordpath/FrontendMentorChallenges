import * as React from 'react'
// import Content from './Content'
import TestArea from './TestArea'
import Footer from './Footer'
import Header from './Header'
import SVGDefs from './SVGDefs'
import Helper from './Helper'

export default React.memo(function () {
    return <>
        <SVGDefs></SVGDefs>
        <div className="app-container">
            <Header></Header>
            {/* <Content></Content> */}
            <TestArea/>
            <Footer></Footer>
            <Helper/>
        </div>
    </>
})