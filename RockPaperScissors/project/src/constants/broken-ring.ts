
type IBrokenRingColors = Array<{
    readonly id: string,
    readonly start: string,
    readonly end: string,
    readonly img: string
}>

export const brokenRingAssets: IBrokenRingColors = [
    {
        id: 'brc-orange',
        start: 'orange',
        end: '#A14D00',
        img: './images/icon-scissors.svg'
    },
    {
        id: 'brc-blue',
        start: '#516DF3',
        end: '#2B44B7',
        img: './images/icon-paper.svg'
    },
    {
        id: 'brc-red',
        start: '#DB3554',
        end: '#9B1836',
        img: './images/icon-rock.svg'
    },
    {
        id: 'brc-purple',
        start: '#8757E3',
        end: '#5D37A6',
        img: './images/icon-lizard.svg'
    },
    {
        id: 'brc-cyan',
        start: '#46BBCD',
        end: '#3588A5',
        img: './images/icon-spock.svg'
    }
]

const choiceNum = brokenRingAssets.length
const angleStep = 2 * Math.PI / choiceNum
export function computePositions(cenDist: number, initAngle: number = 0) {
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
