import { dispatch, updateLayout } from './store'


const minDesktopWidth = 800

const cb = () => {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width
    const isMobile = width < minDesktopWidth
    dispatch(updateLayout({ isMobile }))
}

cb()
window.addEventListener('resize', cb)
