const minDesktopWidth = 800
export let isMobile: boolean = false

const cb = () => {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width
    isMobile = width < minDesktopWidth
}

cb()
window.addEventListener('resize', cb)
