import { dispatch, updateLayout, store } from './store'


const minDesktopWidth = 800

const cb = () => {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width
    const isMobile = width < minDesktopWidth
    if (store.getState().game.observed.isMobile != isMobile)
        dispatch(updateLayout({ isMobile }))
}

cb()
window.addEventListener('resize', cb)
