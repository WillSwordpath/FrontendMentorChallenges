import * as React from 'react'

export default React.memo(function () {
    return <section style={{
        background: 'green',
        flexGrow: 1
    }}>
        <div style={{
            width: '60%',
            height: '100px',
            background: 'blue'
        }}></div>

    </section>
})