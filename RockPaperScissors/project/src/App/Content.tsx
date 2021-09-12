import * as React from 'react'
import { memo, useRef, useEffect } from 'react'
import Choice from './components/Choice'
import './Content.css'
import { computePositions, brokenRingAssets } from '../constants/broken-ring'
import { dispatch, setSecSize, stateType } from '../states/store'
import { useSelector } from 'react-redux'
import { shallowEqual } from '../states/funcs'


function getPolygonPath(ary: {x:number, y:number}[], offset: {x:number, y:number} = {x: 500, y: 500}): string {
    const len = ary.length
    if (len < 3)
        return ''
    let str = ''
    for (let i = 0; i < len; i++) {
        const cur = ary[i]
        switch (i) {
            case 0:
                str += `M${offset.x + cur.x} ${offset.y + cur.y}`
                break
            case len -1:
                str += `L${offset.x + cur.x} ${offset.y + cur.y}z`
                break
            default:
                str += `L${offset.x + cur.x} ${offset.y + cur.y}`
        }
    }
    return str
}

export default memo(function () {
    const anchorPos = useSelector((state: stateType) => {
        const game = state.game
        if (game.secSize.width == undefined || game.secSize.height == undefined)
            return {}
        return {
            x: game.secSize.width * game.chcGrpOffset.xPerc,
            y: game.secSize.height * game.chcGrpOffset.yPerc
        }
    }, shallowEqual)

    const centerDistance = useSelector((state: stateType) => state.game.chcGrpRadius)
    const pos = computePositions(centerDistance)

    const secRef = useRef(null)
    useEffect(() => {
        window.addEventListener('resize', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])
    useEffect(() => {
        resizeHandler()
    })
    function resizeHandler() {
        const section = secRef.current as HTMLElement | null
        if (!section)
            return
        const rect = section.getBoundingClientRect()
        dispatch(setSecSize({
            width: rect.width,
            height: rect.height
        }))
    }
    const controlledSecSize = useSelector((state: stateType) => state.game.secSize, shallowEqual)

    return (
        <section className="content" ref={secRef} style={{
            height: controlledSecSize.height
        }}>
            {
                anchorPos.x != undefined && anchorPos.y != undefined ?
                <span className="choice-group-anchor" style={{
                    left: anchorPos.x + 'px',
                    top: anchorPos.y + 'px'
                }}>
                    <svg viewBox="0 0 1000 1000" width="1000" style={{
                        position: 'absolute',
                        left: '-500px',
                        top: '-500px',
                    }}>
                        <path d={getPolygonPath(pos)} strokeLinejoin="round" fill="none" stroke="#555" strokeWidth="5"></path>
                    </svg>
                    {
                        brokenRingAssets.map((brc, idx) =>
                            <Choice key={brc.id}
                            offset={pos[idx]}
                            ringStrokeColor={brc.start}
                            brokenRingGradId={brc.id}
                            imgSrc={brc.img}
                            ></Choice>
                        )
                    }
                </span>
                : undefined
            }
        </section>
    )
})