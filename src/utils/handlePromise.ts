import type { Response } from '@/types/global.d.ts'

export const handleSuccessResponse = (res: Response, callback: Function | (() => any)) => {
    if (res.msg === '成功') {
        callback()
    } else {
        ElMessage({
            type: 'warning',
            message: res.msg,
            grouping: true,
            offset: 100
        })
    }
}
