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

export function layout({ isMobile, obWidth, obHeight, state }: IObservation): IContentLayout {
    let ret: IContentLayout
    const obMinSize = min(obWidth, obHeight)
    let selDiam, unSDiam, resultHeight, remainHeight
    if (isMobile) {
        switch (state) {
            case EContentState.unselected:
                unSDiam = obMinSize * .3
                ret = {
                    anchor: {
                        x: obWidth * .5,
                        y: obHeight * .5
                    },
                    choiceCentDist: obMinSize * .333,
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
                        top: unSDiam * .5 * 1.333
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
                unSDiam = obMinSize * .3
                ret = {
                    anchor: {
                        x: obWidth * .5,
                        y: obHeight * .5
                    },
                    choiceCentDist: obMinSize * .333,
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
                        top: unSDiam * .5 * 1.333
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
                selDiam = obMinSize * .35
                unSDiam = obMinSize * .3
                ret = {
                    anchor: {
                        x: obWidth * .5,
                        y: obHeight * .5
                    },
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
                        top: selDiam * .5 * 1.333
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
                selDiam = obMinSize * .35
                unSDiam = obMinSize * .3
                resultHeight = 160 // TODO
                remainHeight = obHeight - resultHeight
                ret = {
                    anchor: {
                        x: obWidth * .5,
                        y: obHeight * .5
                    },
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
                        top: selDiam * .5 * 1.333
                    },
                    playerPicked: {
                        left: obWidth * (.27 - .5),
                        top: (remainHeight - obHeight) * .5
                    },
                    housePicked: {
                        left: obWidth * (.73 - .5),
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
                selDiam = obMinSize * .35
                unSDiam = obMinSize * .3
                resultHeight = 160 // TODO
                remainHeight = obHeight - resultHeight
                ret = {
                    anchor: {
                        x: obWidth * .5,
                        y: obHeight * .5
                    },
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
                        top: selDiam * .5 * 1.333
                    },
                    playerPicked: {
                        left: obWidth * (.27 - .5),
                        top: (remainHeight - obHeight) * .5
                    },
                    housePicked: {
                        left: obWidth * (.73 - .5),
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
                selDiam = obMinSize * .35
                unSDiam = obMinSize * .3
                resultHeight = 160 // TODO
                remainHeight = obHeight - resultHeight
                ret = {
                    anchor: {
                        x: obWidth * .5,
                        y: obHeight * .5
                    },
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
                        top: selDiam * .5 * 1.333
                    },
                    playerPicked: {
                        left: obWidth * (.27 - .5),
                        top: (remainHeight - obHeight) * .5
                    },
                    housePicked: {
                        left: obWidth * (.73 - .5),
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
                selDiam = obMinSize * .35
                unSDiam = obMinSize * .3
                resultHeight = 160 // TODO
                remainHeight = obHeight - resultHeight
                ret = {
                    anchor: {
                        x: obWidth * .5,
                        y: obHeight * .5
                    },
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
                        top: selDiam * .5 * 1.333
                    },
                    playerPicked: {
                        left: obWidth * (.27 - .5),
                        top: (remainHeight - obHeight) * .5
                    },
                    housePicked: {
                        left: obWidth * (.73 - .5),
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
    } else {
        switch (state) {
            case EContentState.unselected:
                ret = desktopTodo(obMinSize, obWidth, obHeight)
                break
            case EContentState.hidePolygon:
                ret = desktopTodo(obMinSize, obWidth, obHeight)
                break
            case EContentState.centralize:
                ret = desktopTodo(obMinSize, obWidth, obHeight)
                break
            case EContentState.pairPosition:
                ret = desktopTodo(obMinSize, obWidth, obHeight)
                break
            case EContentState.transOutText:
                ret = desktopTodo(obMinSize, obWidth, obHeight)
                break
            case EContentState.showHousePick:
                ret = desktopTodo(obMinSize, obWidth, obHeight)
                break
            case EContentState.showResult:
                ret = desktopTodo(obMinSize, obWidth, obHeight)
                break
        }
    }
    return ret
}

/**
 * TODO
 * @param obMinSize 
 * @param obWidth 
 * @param obHeight 
 * @returns 
 */
function desktopTodo(obMinSize: number, obWidth: number, obHeight: number): IContentLayout {
    const unSDiam = obMinSize * .3
    return {
        anchor: {
            x: obWidth * .5,
            y: obHeight * .5
        },
        choiceCentDist: obMinSize * .333,
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
            top: unSDiam * .5 * 1.333
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
}
