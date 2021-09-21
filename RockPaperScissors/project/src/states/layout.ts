export enum EContentState {
    unselected,
    hidePolygon,
    centralize,
    pairPosition,
    transOutText,
    showHousePick,
    showResult
}

export interface IObservation {
    isMobile: boolean
    obWidth: number
    obHeight: number
    state: EContentState
}

export interface IObservationUpdate {
    isMobile?: boolean
    obWidth?: number
    obHeight?: number
    state?: EContentState
}

interface IPointPosition {
    top: number
    left: number
}

interface IBoxPosition extends IPointPosition {
    width: number
    height: number
}

interface IPickedTextDist {
    top?: number
    bottom?: number
}

export interface IContentLayout {
    anchor: {
        x: number
        y: number
    } | undefined
    choiceCentDist: number
    choiceDiam: {
        sel: number
        unS: number
    }
    resultBox: IBoxPosition
    pickedTextDist: IPickedTextDist
    playerPicked: IPointPosition
    housePicked: IPointPosition
    show: {
        polygon: boolean
        unS: boolean
        house: boolean
        housePick: boolean
        result: boolean
    }
}

function min(left: number, right: number): number {
    let ret = left
    if (right < left)
        ret = right
    return ret
}

const inactChoiceSizePerc = .28
const inactChoiceGroupRadiusPerc = .333
const actChoiceSizePerc = .35
const pickedTextDiamRatio = .5 * 1.333
const defaultResultHeight = 160
const actPlayerLeftPerc = .27
const actHouseLeftPerc = 1 - actPlayerLeftPerc

export function layout({ isMobile, obWidth, obHeight, state }: IObservation): IContentLayout {
    let ret: IContentLayout
    const obMinSize = min(obWidth, obHeight)
    const isDesktop = !isMobile
    let selDiam: number,
        unSDiam: number,
        resultHeight: number,
        remainHeight: number
    const anchor = {
        x: obWidth * .5,
        y: obHeight * .5
    }
    switch (state) {
        case EContentState.unselected:
            unSDiam = obMinSize * inactChoiceSizePerc
            ret = {
                anchor,
                choiceCentDist: obMinSize * inactChoiceGroupRadiusPerc,
                choiceDiam: {
                    sel: unSDiam,
                    unS: unSDiam
                },
                resultBox: {
                    top: obHeight * .5,
                    left: -obWidth * .5,
                    width: obWidth,
                    height: 0
                },
                pickedTextDist: {
                    top: unSDiam * pickedTextDiamRatio
                },
                playerPicked: {
                    left: 0,
                    top: 0
                },
                housePicked: {
                    left: 0,
                    top: 0
                },
                show: {
                    polygon: true,
                    unS: true,
                    house: false,
                    housePick: false,
                    result: false
                }
            }
            break
        case EContentState.hidePolygon:
            unSDiam = obMinSize * inactChoiceSizePerc
            ret = {
                anchor,
                choiceCentDist: obMinSize * inactChoiceGroupRadiusPerc,
                choiceDiam: {
                    sel: unSDiam,
                    unS: unSDiam
                },
                resultBox: {
                    top: obHeight * .5,
                    left: -obWidth * .5,
                    width: obWidth,
                    height: 0
                },
                pickedTextDist: {
                    top: unSDiam * pickedTextDiamRatio
                },
                playerPicked: {
                    left: 0,
                    top: 0
                },
                housePicked: {
                    left: 0,
                    top: 0
                },
                show: {
                    polygon: false,
                    unS: false,
                    house: false,
                    housePick: false,
                    result: false
                }
            }
            break
        case EContentState.centralize:
            selDiam = obMinSize * actChoiceSizePerc
            unSDiam = obMinSize * inactChoiceSizePerc
            ret = {
                anchor,
                choiceCentDist: 0,
                choiceDiam: {
                    sel: selDiam,
                    unS: unSDiam
                },
                resultBox: {
                    top: obHeight * .5,
                    left: -obWidth * .5,
                    width: obWidth,
                    height: 0
                },
                pickedTextDist: {
                    top: selDiam * pickedTextDiamRatio
                },
                playerPicked: {
                    left: 0,
                    top: 0
                },
                housePicked: {
                    left: 0,
                    top: 0
                },
                show: {
                    polygon: false,
                    unS: false,
                    house: false,
                    housePick: false,
                    result: false
                }
            }
            break
        case EContentState.pairPosition:
            selDiam = obMinSize * actChoiceSizePerc
            unSDiam = obMinSize * inactChoiceSizePerc
            resultHeight = defaultResultHeight
            remainHeight = obHeight - resultHeight
            ret = {
                anchor,
                choiceCentDist: 0,
                choiceDiam: {
                    sel: selDiam,
                    unS: unSDiam
                },
                resultBox: {
                    top: obHeight * .5 - resultHeight,
                    left: -obWidth * .5,
                    width: obWidth,
                    height: resultHeight
                },
                pickedTextDist: {
                    top: selDiam * pickedTextDiamRatio
                },
                playerPicked: {
                    left: obWidth * (actPlayerLeftPerc - .5),
                    top: (remainHeight - obHeight) * .5
                },
                housePicked: {
                    left: obWidth * (actHouseLeftPerc - .5),
                    top: (remainHeight - obHeight) * .5
                },
                show: {
                    polygon: false,
                    unS: false,
                    house: false,
                    housePick: false,
                    result: false
                }
            }
            break
        case EContentState.transOutText:
            selDiam = obMinSize * actChoiceSizePerc
            unSDiam = obMinSize * inactChoiceSizePerc
            resultHeight = defaultResultHeight
            remainHeight = obHeight - resultHeight
            ret = {
                anchor,
                choiceCentDist: 0,
                choiceDiam: {
                    sel: selDiam,
                    unS: unSDiam
                },
                resultBox: {
                    top: obHeight * .5 - resultHeight,
                    left: -obWidth * .5,
                    width: obWidth,
                    height: resultHeight
                },
                pickedTextDist: {
                    top: selDiam * pickedTextDiamRatio
                },
                playerPicked: {
                    left: obWidth * (actPlayerLeftPerc - .5),
                    top: (remainHeight - obHeight) * .5
                },
                housePicked: {
                    left: obWidth * (actHouseLeftPerc - .5),
                    top: (remainHeight - obHeight) * .5
                },
                show: {
                    polygon: false,
                    unS: false,
                    house: true,
                    housePick: false,
                    result: false
                }
            }
            break
        case EContentState.showHousePick:
            selDiam = obMinSize * actChoiceSizePerc
            unSDiam = obMinSize * inactChoiceSizePerc
            resultHeight = defaultResultHeight
            remainHeight = obHeight - resultHeight
            ret = {
                anchor,
                choiceCentDist: 0,
                choiceDiam: {
                    sel: selDiam,
                    unS: unSDiam
                },
                resultBox: {
                    top: obHeight * .5 - resultHeight,
                    left: -obWidth * .5,
                    width: obWidth,
                    height: resultHeight
                },
                pickedTextDist: {
                    top: selDiam * pickedTextDiamRatio
                },
                playerPicked: {
                    left: obWidth * (actPlayerLeftPerc - .5),
                    top: (remainHeight - obHeight) * .5
                },
                housePicked: {
                    left: obWidth * (actHouseLeftPerc - .5),
                    top: (remainHeight - obHeight) * .5
                },
                show: {
                    polygon: false,
                    unS: false,
                    house: true,
                    housePick: true,
                    result: false
                }
            }
            break
        case EContentState.showResult:
            selDiam = obMinSize * actChoiceSizePerc
            unSDiam = obMinSize * inactChoiceSizePerc
            resultHeight = defaultResultHeight
            remainHeight = obHeight - resultHeight
            ret = {
                anchor,
                choiceCentDist: 0,
                choiceDiam: {
                    sel: selDiam,
                    unS: unSDiam
                },
                resultBox: {
                    top: obHeight * .5 - resultHeight,
                    left: -obWidth * .5,
                    width: obWidth,
                    height: resultHeight
                },
                pickedTextDist: {
                    top: selDiam * pickedTextDiamRatio
                },
                playerPicked: {
                    left: obWidth * (actPlayerLeftPerc - .5),
                    top: (remainHeight - obHeight) * .5
                },
                housePicked: {
                    left: obWidth * (actHouseLeftPerc - .5),
                    top: (remainHeight - obHeight) * .5
                },
                show: {
                    polygon: false,
                    unS: false,
                    house: true,
                    housePick: true,
                    result: true
                }
            }
            break
    }

    return ret
}
