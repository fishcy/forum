import type { Response } from '@/types/global.d.ts'

export const handleSuccessResponse = (
    res: Response,
    callback: Function | (() => any),
    successMsg: string = '成功'
) => {
    if (res.msg === successMsg) {
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
