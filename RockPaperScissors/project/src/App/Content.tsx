import * as React from 'react'
import Choice from './components/Choice'
import './Content.css'

const choiceNum = 5
const angleStep = 2 * Math.PI / choiceNum
const centerDistance = 110
function computePositions(cenDist: number, initAngle: number = 0) {
    const result: Array<{x:number, y:number}> = []
    let angle = initAngle
    for (let i = 0; i < 5; i++) {
        const x = Math.sin(angle) * cenDist
        const y = -Math.cos(angle) * cenDist
        result.push({x, y})
        angle += angleStep
    }
    return result
}

export default React.memo(function () {
    const pos = computePositions(centerDistance)
    return (
        <section className="content">
            <span className="choice-group-anchor">
                <Choice offset={pos[0]}
                    ringStrokeColor='orange' brokenRingGradId='broken-ring-orange' imgSrc='./images/icon-scissors.svg'></Choice>
                <Choice offset={pos[1]}
                    ringStrokeColor='#516DF3' brokenRingGradId='broken-ring-blue' imgSrc='./images/icon-paper.svg'></Choice>
                <Choice offset={pos[2]}
                    ringStrokeColor='#DB3554' brokenRingGradId='broken-ring-blue' imgSrc='./images/icon-rock.svg'></Choice>
                <Choice offset={pos[3]}
                    ringStrokeColor='#8757E3' brokenRingGradId='broken-ring-blue' imgSrc='./images/icon-lizard.svg'></Choice>
                <Choice offset={pos[4]}
                    ringStrokeColor='#46BBCD' brokenRingGradId='broken-ring-blue' imgSrc='./images/icon-spock.svg'></Choice>
            </span>
        </section>
    )
})