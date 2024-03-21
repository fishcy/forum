export const timeDistanceFromNow = (timestamp: number) => {
    /**
     * 刚刚：小于一分钟
     * 以分钟为单位：小于一小时
     * 以小时为单位：小于一天
     * 以月为单位：小于一年
     * 最后以年单位
     *
     */
    const now = Date.now()

    const seconds = Math.floor((now - timestamp) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (years) return `${years}年前`
    if (months) return `${months}月前`
    if (days) return `${days}天前`
    if (hours) return `${hours}小时前`
    if (minutes) return `${minutes}分钟前`
    return '刚刚'
}

export const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

export const formatMessageDate = (timestamp: number) => {
    const now = new Date()
    const targetDate = new Date(timestamp)

    const year = targetDate.getFullYear()
    const month = String(targetDate.getMonth() + 1).padStart(2, '0')
    const day = String(targetDate.getDate()).padStart(2, '0')
    const hours = String(targetDate.getHours()).padStart(2, '0')
    const minutes = String(targetDate.getMinutes()).padStart(2, '0')

    // 如果是同一年，则忽略年份
    if (now.getFullYear() === year) {
        // 如果是同一天，则忽略年月日
        if (now.getDate() === targetDate.getDate() && now.getMonth() === targetDate.getMonth()) {
            return `${hours}:${minutes}`
        }
        // 如果是昨天，则替换年月日为昨天
        const yesterday = new Date(now)
        yesterday.setDate(now.getDate() - 1)
        if (
            yesterday.getDate() === targetDate.getDate() &&
            yesterday.getMonth() === targetDate.getMonth()
        ) {
            return `昨天 ${hours}:${minutes}`
        }
        return `${month}-${day} ${hours}:${minutes}`
    }

    return `${year}-${month}-${day} ${hours}:${minutes}`
}
