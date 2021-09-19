export interface IDeviceInfo {
    width: number
    isMobile: boolean
}

const minDesktopWidth = 800

export const info: IDeviceInfo = {
    width: 0,
    isMobile: false
}

const cb = () => {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width
    info.isMobile = width < minDesktopWidth
    info.width = width
}

cb()
window.addEventListener('resize', cb)
