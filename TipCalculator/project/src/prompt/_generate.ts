export default function gen(fn: Function): Function {
    const promptFn = () => {
        if (promptFn.active)
            return
        promptFn.active = true
        Promise.resolve().then(() => {
            fn()
            promptFn.active = false
        })
    }
    promptFn.active = false
    return promptFn
}
