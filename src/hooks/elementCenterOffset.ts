import { onMounted, onUnmounted, ref } from 'vue'

/**
 *
 * @param elId 目标元素的id
 * @returns 目标元素的中心点 对于 左上角的偏移量（boder-box-size）
 */
export const useElementCenterOffset = (elId: string) => {
    const centerOffsetX = ref<number>(0),
        centerOffsetY = ref<number>(0)

    const config: ResizeObserverOptions = {
        box: 'border-box'
    }

    const callback: ResizeObserverCallback = (entries) => {
        centerOffsetX.value = entries[0].borderBoxSize[0].inlineSize / 2
        centerOffsetY.value = entries[0].borderBoxSize[0].blockSize / 2
    }

    const observer: ResizeObserver = new ResizeObserver(callback)
    onMounted(() => {
        const el = document.querySelector(`#${elId}`) as HTMLElement
        observer.observe(el, config)
    })
    onUnmounted(() => {
        observer.disconnect()
    })

    return {
        centerOffsetX,
        centerOffsetY
    }
}
