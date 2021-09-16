import * as React from 'react'
import { memo, useRef, useEffect, useMemo } from 'react'
import Choice from './components/Choice'
import './Content.css'
import { computePositions, brokenRingAssets } from '../constants/broken-ring'
import { dispatch, stateType, updateContentSizes } from '../states/store'
import { useSelector } from 'react-redux'
import { protectedShallowEqual } from '../states/funcs'

function getPolygonPath(ary: { x: number, y: number }[], offset: { x: number, y: number } = { x: 500, y: 500 }): string {
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
            case len - 1:
                str += `L${offset.x + cur.x} ${offset.y + cur.y}z`
                break
            default:
                str += `L${offset.x + cur.x} ${offset.y + cur.y}`
        }
    }
    return str
}

function onResizeObserved(entries: ResizeObserverEntry[]) {
    const secSizeArray = entries[0].borderBoxSize
    const secSize = secSizeArray[0]
    const width = secSize.inlineSize
    const height = secSize.blockSize
    console.log('width', width, 'height', height)  // TODO
    dispatch(updateContentSizes({
        ctnWidth: width,
        ctnHeight: height
    }))
}

export default memo(function () {
    const anchorPos = useSelector((state: stateType) => state.game.contentSizes.anchorPos, protectedShallowEqual)

    const centerDistance = useSelector((state: stateType) => state.game.chcGrpRadius)
    const pos = computePositions(centerDistance)

    const secRef = useRef(null)
    const observer = useMemo(() => new ResizeObserver(onResizeObserved), [])
    useEffect(() => {
        const section = secRef.current as HTMLElement | null
        if (section) {
            const rect = section.getBoundingClientRect()
            dispatch(updateContentSizes({
                ctnWidth: rect.width,
                ctnHeight: rect.height
            }))
            observer.observe(section, { box: 'border-box' })
        }
        return () => {
            if (section)
                observer.unobserve(section)
        }
    }, [])

    return (
        <section className="content" ref={secRef}>
            {
                anchorPos != undefined &&
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
            }
        </section>
    )
})