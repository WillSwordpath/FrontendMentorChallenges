import * as React from 'react'
import { memo, useRef, useEffect } from 'react'
import Choice from './components/Choice'
import './Content.css'
import { computePositions, brokenRingAssets } from '../constants/broken-ring'
import { dispatch, setSecSize, stateType } from '../states/store'
import { useSelector } from 'react-redux'
import { shallowEqual } from '../states/funcs'


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
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])
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

    return (
        <section className="content" ref={secRef}>
            {
                anchorPos.x != undefined && anchorPos.y != undefined ?
                <span className="choice-group-anchor" style={{
                    left: anchorPos.x + 'px',
                    top: anchorPos.y + 'px'
                }}>
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