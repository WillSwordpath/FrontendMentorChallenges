export interface IIndexableObject {
    [index: string]: any
}

export function shallowEqual(objLeft: IIndexableObject, objRight: IIndexableObject): boolean {
    const keysLeft = Object.keys(objLeft)
    const keysRight = Object.keys(objRight)
    if (keysLeft.length !== keysRight.length) {
        return false
    }
    for (let key of keysLeft) {
        if (objLeft[key] !== objRight[key]) {
            return false
        }
    }
    return true
}

export function protectedShallowEqual(objLeft: any, objRight: any): boolean {
    if (typeof objLeft != 'object' && typeof objRight != 'object')
        return objLeft === objRight
    if (typeof objLeft == 'object' && typeof objRight == 'object')
        return shallowEqual(objLeft, objRight)
    return false
}

export function deepEqual(objLeft: IIndexableObject, objRight: IIndexableObject): boolean {
    const keysLeft = Object.keys(objLeft)
    const keysRight = Object.keys(objRight)
    if (keysLeft.length !== keysRight.length) {
        return false
    }
    for (let key of keysLeft) {
        const curLeft = objLeft[key]
        const curRight = objRight[key]
        if (typeof curLeft == 'object') {
            if (typeof curRight != 'object')
                return false
            else if (!deepEqual(curLeft, curRight))
                return false
        } else {
            if (typeof curRight == 'object')
                return false
            else if (curLeft !== curRight)
                return false
        }
    }
    return true
}
