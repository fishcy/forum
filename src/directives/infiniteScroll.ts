import { nextTick, type ObjectDirective, type ComponentPublicInstance } from 'vue'
import { isFunction, throttle } from 'lodash-es'

const SCOPE = 'ElInfiniteScroll'
const CHECK_INTERVAL = 50
const DEFAULT_DELAY = 200
const DEFAULT_DISTANCE = 0

const attributes = {
    delay: {
        type: Number,
        default: DEFAULT_DELAY
    },
    distance: {
        type: Number,
        default: DEFAULT_DISTANCE
    },
    disabled: {
        type: Boolean,
        default: false
    },
    immediate: {
        type: Boolean,
        default: true
    }
}

type Attrs = typeof attributes
type ScrollOptions = { [K in keyof Attrs]: Attrs[K]['default'] }
type InfiniteScrollCallback = () => void
type InfiniteScrollEl = HTMLElement & {
    [SCOPE]: {
        container: HTMLElement | Window
        containerEl: HTMLElement
        instance: ComponentPublicInstance
        delay: number // export for test
        lastScrollTop: number
        cb: InfiniteScrollCallback
        onScroll: () => void
        observer?: MutationObserver
    }
}

const getScrollOptions = (el: HTMLElement, instance: ComponentPublicInstance): ScrollOptions => {
    return Object.entries(attributes).reduce((acm, [name, option]) => {
        const { type, default: defaultValue } = option
        const attrVal = el.getAttribute(`infinite-scroll-${name}`)
        // @ts-ignore
        let value = instance[attrVal] ?? attrVal ?? defaultValue
        value = value === 'false' ? false : value
        value = type(value)
        // @ts-ignore
        acm[name] = Number.isNaN(value) ? defaultValue : value
        return acm
    }, {} as ScrollOptions)
}

const destroyObserver = (el: InfiniteScrollEl) => {
    const { observer } = el[SCOPE]

    if (observer) {
        observer.disconnect()
        delete el[SCOPE].observer
    }
}

const handleScroll = (el: InfiniteScrollEl, cb: InfiniteScrollCallback) => {
    const { container, containerEl, instance, observer, lastScrollTop } = el[SCOPE]
    const { disabled, distance } = getScrollOptions(el, instance)
    const { scrollTop } = containerEl
    const delta = scrollTop - lastScrollTop

    el[SCOPE].lastScrollTop = scrollTop

    // trigger only if full check has done and not disabled and scroll up
    if (observer || disabled || delta > 0) return

    let shouldTrigger = false

    shouldTrigger = scrollTop <= distance

    if (shouldTrigger) {
        cb.call(instance)
    }
}

function checkFull(el: InfiniteScrollEl, cb: InfiniteScrollCallback) {
    const { containerEl, instance } = el[SCOPE]
    const { disabled } = getScrollOptions(el, instance)

    if (disabled || containerEl.clientHeight === 0) return

    if (containerEl.scrollHeight <= containerEl.clientHeight) {
        cb.call(instance)
    } else {
        destroyObserver(el)
    }
}

const InfiniteScrollUp: ObjectDirective<InfiniteScrollEl, InfiniteScrollCallback> = {
    async mounted(el, binding) {
        const { instance, value: cb } = binding
        if (!isFunction(cb)) throw Error("'v-infinite-scroll-top' binding value must be a function")
        await nextTick()
        const { delay, immediate } = getScrollOptions(el, instance!)
        const container = el,
            containerEl = el
        const onScroll = throttle(handleScroll.bind(null, el, cb), delay)

        if (!container) return

        el[SCOPE] = {
            // @ts-ignore
            instance,
            container,
            containerEl,
            delay,
            cb,
            onScroll,
            lastScrollTop: containerEl.scrollTop
        }

        if (immediate) {
            const observer = new MutationObserver(
                throttle(checkFull.bind(null, el, cb), CHECK_INTERVAL)
            )
            el[SCOPE].observer = observer
            observer.observe(el, { childList: true, subtree: true })
            checkFull(el, cb)
        }

        container.addEventListener('scroll', onScroll)
    },
    unmounted(el) {
        const { container, onScroll } = el[SCOPE]

        container?.removeEventListener('scroll', onScroll)
        destroyObserver(el)
    },
    async updated(el) {
        if (!el[SCOPE]) {
            await nextTick()
        } else {
            const { containerEl, cb, observer } = el[SCOPE]
            if (containerEl.clientHeight && observer) {
                checkFull(el, cb)
            }
        }
    }
}

export default InfiniteScrollUp
