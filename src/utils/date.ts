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
