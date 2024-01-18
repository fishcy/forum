export const checkEmail = (email: string) => {
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return regex.test(email)
}

export const checkPhone = (phone: string) => {
    const regex = /^1[34578]\d{9}$/
    return regex.test(phone)
}

/**
 * 密码强度校验
 * @param password
 * @returns
 * 0：密码长度小于8
 * 1：弱
 * 2~3：中
 * 4：强
 */
export const checkPassword = (password: string) => {
    if (password.length < 8) return 0
    const rules = {
        containsUppercase: /[A-Z]/.test(password) ? 1 : 0,
        containsLowercase: /[a-z]/.test(password) ? 1 : 0,
        containsNumber: /\d/.test(password) ? 1 : 0,
        containsSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) ? 1 : 0
    }
    const strengthScore = Object.values(rules).reduce((acc, val) => acc + val, 0)
    return strengthScore
}

export const confirmPasswordAgain = (pre: string, next: string) => {
    return pre === next && pre !== ''
}
