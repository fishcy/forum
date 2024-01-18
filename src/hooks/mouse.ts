import { onMounted, onUnmounted, ref } from 'vue'
import { useElementBoundary, useElementCenterOffset } from '@/hooks'
import { throttle } from '@/utils/throttle'

type DragDirection = 'left' | 'top' | 'all'

/**
 *
 * @param parentId 父元素的id
 * @param childId 子元素的id
 * @returns 子元素在父元素上拖拽时，中心点的位置
 */
export const useMouse = (
    parentId: string,
    childId: string,
    dragDirection: DragDirection = 'all'
) => {
    let parentEl: HTMLElement, childEl: HTMLElement
    const centerX = ref<number>(0),
        centerY = ref<number>(0)
    const isDragging = ref(false)

    const { centerOffsetX, centerOffsetY } = useElementCenterOffset(childId)

    const { width, height } = useElementBoundary(parentId)
    const minValue = 0
    // x的范围
    const xRange = (value: number) => {
        if (value < minValue) return 0
        if (value > width.value) return width.value
        return value
    }

    // y的范围
    const yRange = (value: number) => {
        if (value < minValue) return 0
        if (value > height.value) return height.value
        return value
    }

    const setTop = throttle(() => {
        childEl.style.top = `${centerY.value - centerOffsetY.value}px`
    }, 10)
    const setLeft = throttle(() => {
        childEl.style.left = `${centerX.value - centerOffsetX.value}px`
    }, 10)

    const update = (event: MouseEvent) => {
        switch (dragDirection) {
            case 'all':
                centerX.value = xRange(event.clientX - parentEl.getBoundingClientRect().left)
                centerY.value = yRange(event.clientY - parentEl.getBoundingClientRect().top)
                setLeft()
                setTop()
                break
            case 'left':
                centerX.value = xRange(event.clientX - parentEl.getBoundingClientRect().left)
                setLeft()
                break
            case 'top':
                centerY.value = yRange(event.clientY - parentEl.getBoundingClientRect().top)
                setTop()
                break
        }
    }

    const mouseDownCallback = (event: MouseEvent) => {
        isDragging.value = true
        update(event)
    }

    const mouseUpCallback = () => {
        isDragging.value = false
    }

    const mouseMoveCallback = (event: MouseEvent) => {
        if (isDragging.value) update(event)
        return false
    }

    onMounted(() => {
        parentEl = document.querySelector(`#${parentId}`) as HTMLElement
        childEl = document.querySelector(`#${childId}`) as HTMLElement
        parentEl.addEventListener('mousedown', mouseDownCallback)
        document.addEventListener('mouseup', mouseUpCallback)
        document.addEventListener('mousemove', mouseMoveCallback)
    })
    onUnmounted(() => {
        parentEl.removeEventListener('mousedown', mouseDownCallback)
        document.removeEventListener('mouseup', mouseUpCallback)
        document.removeEventListener('mousemove', mouseMoveCallback)
    })

    return dragDirection === 'all'
        ? { centerX, centerY }
        : dragDirection === 'left'
        ? { centerX }
        : { centerY }
}
