export const throttle = (fn: Function, delay: number) => {
    let flag = true
    return function () {
        if (!flag) return
        flag = false
        setTimeout(() => {
            flag = true
            fn()
        }, delay)
    }
}
