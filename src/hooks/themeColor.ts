import { ref, watchEffect } from 'vue'

const theme_color = ref('linear-gradient(52deg, #00A3CC, #00B050, #00A3CC)')
const theme_highlight_color = ref('linear-gradient(52deg, #00FFFF, #00E868, #00FFFF)')

// 监听theme_color的变化
watchEffect(() => {
    document.documentElement.style.setProperty('--theme-color', theme_color.value)
})

// 监听theme_highlight_color的变化
watchEffect(() => {
    document.documentElement.style.setProperty(
        '--theme-highlight-color',
        theme_highlight_color.value
    )
})

// 暴露 set_theme_color方法
export const set_theme_color = (color: string) => {
    theme_color.value = color
}

// 暴露 set_theme_highlight_color方法
export const set_theme_highlight_color = (color: string) => {
    theme_highlight_color.value = color
}

console.log("我被调用了")