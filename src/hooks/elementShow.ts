import { onMounted, onUnmounted, ref } from 'vue'

type state = 'show' | 'hide'

/**
 *
 * @param elId 需要进行事件委派的元素id
 * @param clickElId 点击的元素id
 * @returns 一个ref数据，是否隐藏该元素
 */
export const useElementShow = (elId: string, clickElId: string, defaultState: state = 'hide') => {
    const isShow = ref<boolean>(defaultState === 'show' ? true : false)
    let el: HTMLElement, clickEl: HTMLElement
    const hideHandle = (e: MouseEvent) => {
        // 如果 当前点击的元素 和 需要隐藏的目标元素 相同，或者 当前点击的元素 是 目标元素 的子孙元素，则不执行任何操作
        if (el === e.target || el.contains(e.target as Node)) return
        isShow.value = false
    }

    // 当 点击 点击元素时，改变显示状态
    const stateChange = (e: MouseEvent) => {
        e.stopPropagation()
        isShow.value = !isShow.value
    }

    onMounted(() => {
        el = document.getElementById(elId) as HTMLElement
        clickEl = document.getElementById(clickElId) as HTMLElement
        // 事件委派
        document.body.addEventListener('click', hideHandle)
        clickEl.addEventListener('click', stateChange)
    })

    onUnmounted(() => {
        document.body.removeEventListener('click', hideHandle)
        clickEl.removeEventListener('click', stateChange)
    })
    return isShow
}
