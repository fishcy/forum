// 深化颜色
const darkedColor = (rgb: string, percentage: number = 20) => {
    const rgbaArr = rgb
        .replace(/[rgba(|)]/g, '')
        .split(', ')
        .map((val) => parseFloat(val))
    for (let i = 0; i < 3; ++i) {
        rgbaArr[i] = Math.round(rgbaArr[i] * (1 - percentage / 100))
    }
    if (!rgbaArr[3]) rgbaArr[3] = 1
    return `rgba(${rgbaArr.join(', ')})`
}

// 浅化颜色
const lightenColor = (rgb: string, percentage: number = 80) => {
    const rgbaArr = rgb
        .replace(/[rgba(|)]/g, '')
        .split(', ')
        .map((val) => parseFloat(val))
    for (let i = 0; i < 3; ++i) {
        rgbaArr[i] = Math.round(rgbaArr[i] + (255 - rgbaArr[i]) * (percentage / 100))
    }
    if (!rgbaArr[3]) rgbaArr[3] = 1
    return `rgba(${rgbaArr.join(', ')})`
}

export const updateThemeColor = (newThemeColor: string) => {
    document.documentElement.style.setProperty('--theme-color', newThemeColor)
    document.documentElement.style.setProperty('--theme-color-hover', darkedColor(newThemeColor))
    document.documentElement.style.setProperty(
        '--theme-color-active',
        lightenColor(newThemeColor, 90)
    )
    document.documentElement.style.setProperty(
        '--theme-bg-color-1',
        `linear-gradient(53deg, ${newThemeColor}, 90%, #fff)`
    )
    document.documentElement.style.setProperty(
        '--theme-bg-color-2',
        `linear-gradient(180deg, ${lightenColor(newThemeColor, 90)}, 5%, #f8f8f8)`
    )
    document.documentElement.style.setProperty(
        '--theme-message-bg-color',
        lightenColor(newThemeColor, 10)
    )
}
