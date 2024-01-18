import { ref, onMounted, onUnmounted } from 'vue'

/**
 *
 * @param elId 目标元素的id
 * @returns 目标元素的border-box-size
 */
export const useElementBoundary = (elId: string) => {
    const width = ref<number>(0)
    const height = ref<number>(0)
    let el: HTMLElement

    const config: ResizeObserverOptions = {
        box: 'border-box'
    }

    const callback: ResizeObserverCallback = (entries) => {
        width.value = entries[0].borderBoxSize[0].inlineSize
        height.value = entries[0].borderBoxSize[0].blockSize
    }

    const observer: ResizeObserver = new ResizeObserver(callback)

    onMounted(() => {
        el = document.querySelector(`#${elId}`) as HTMLElement
        observer.observe(el, config)
    })
    onUnmounted(() => {
        observer.disconnect()
    })

    return {
        width,
        height
    }
}
