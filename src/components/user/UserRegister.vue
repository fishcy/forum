<template>
    <div class="register-card" @click.stop>
        <h2>注册</h2>
        <!-- 邮箱 -->
        <div class="input-box">
            <BaseInput class="email-input" placeholder="请输入邮箱" v-model="email" />
            <font-awesome-icon
                v-if="emailFlag"
                :icon="['fas', 'check']"
                class="check-icon"
                size="2xs"
            />
            <font-awesome-icon v-else :icon="['fas', 'xmark']" class="error-icon" size="2xs" />
        </div>
        <!-- 手机号 -->
        <div class="input-box">
            <BaseInput class="phone-input" placeholder="请输入手机号" v-model="phone" />
            <font-awesome-icon
                v-if="phoneFlag"
                :icon="['fas', 'check']"
                class="check-icon"
                size="2xs"
            />
            <font-awesome-icon v-else :icon="['fas', 'xmark']" class="error-icon" size="2xs" />
        </div>
        <!-- 密码 -->
        <div class="input-box">
            <BaseInput
                class="password-input"
                type="password"
                placeholder="请输入密码"
                v-model="password"
                @focus="passwordConfirmShow = true"
                @blur="passwordConfirmShow = false"
            />
            <font-awesome-icon
                v-if="passwordFlag > 0"
                :icon="['fas', 'check']"
                class="check-icon"
                size="2xs"
            />
            <font-awesome-icon
                v-else-if="passwordFlag === 0"
                :icon="['fas', 'xmark']"
                class="error-icon"
                size="2xs"
            />
        </div>
        <!-- 密码强度 -->
        <div class="strength-box" :class="{ 'strength-box-focus': passwordConfirmShow }">
            <div
                :class="{
                    red: passwordFlag === 1,
                    orange: [2, 3].includes(passwordFlag),
                    green: passwordFlag === 4
                }"
            ></div>
            <div
                :class="{ orange: [2, 3].includes(passwordFlag), green: passwordFlag === 4 }"
            ></div>
            <div :class="{ green: passwordFlag === 4 }"></div>
        </div>
        <!-- 确认密码 -->
        <div class="input-box">
            <BaseInput
                class="confirm-password-input"
                type="password"
                placeholder="请再输入一次密码"
                v-model="confirmPassword"
            />
            <font-awesome-icon
                v-if="confirmFlag"
                :icon="['fas', 'check']"
                class="check-icon"
                size="2xs"
            />
            <font-awesome-icon v-else :icon="['fas', 'xmark']" class="error-icon" size="2xs" />
        </div>
        <BaseButton class="register-button" @click="register({ email, phone, password })"
            >注 册</BaseButton
        >
    </div>
</template>

<script setup lang="ts">
import BaseInput from '../base/BaseInput.vue'
import BaseButton from '../base/BaseButton.vue'
import { ref, watchEffect } from 'vue'
import { checkEmail, checkPhone, checkPassword, confirmPasswordAgain } from '@/utils/check'
import { register } from '@/api/register'

const email = ref('chuyuzhong1@gmail.com')
const phone = ref('13006750587')
const password = ref('Zcy1005.')
const confirmPassword = ref('Zcy1005.')

const emailFlag = ref(false)
watchEffect(() => {
    emailFlag.value = checkEmail(email.value)
})

const phoneFlag = ref(false)
watchEffect(() => {
    phoneFlag.value = checkPhone(phone.value)
})

const passwordFlag = ref(0)
watchEffect(() => {
    passwordFlag.value = checkPassword(password.value)
})

const confirmFlag = ref(false)
watchEffect(() => {
    confirmFlag.value = confirmPasswordAgain(password.value, confirmPassword.value)
})

const passwordConfirmShow = ref(false)
</script>

<style lang="scss" scoped>
.register-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    .register-card {
        width: px2rem(500);
        height: px2rem(600);
        background-color: white;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        h2 {
            font-size: px2rem(24);
        }

        .input-box {
            display: flex;
            justify-content: center;
            flex-direction: column;
            margin-top: px2rem(20);
            position: relative;

            .check-icon,
            .error-icon {
                font-size: px2rem(24);
                right: px2rem(-32);
                position: absolute;
            }

            .check-icon {
                color: #62e464;
            }

            .error-icon {
                color: #f31616;
            }

            .email-input,
            .phone-input,
            .password-input,
            .confirm-password-input {
                height: px2rem(44);
                width: px2rem(220);
            }
        }
        .register-button {
            height: px2rem(44);
            width: px2rem(220);
            margin-top: px2rem(40);
            font-weight: bold;
            font-size: px2rem(16);
        }

        .strength-box {
            margin-top: px2rem(5);
            display: none;
            height: px2rem(6);
            width: px2rem(220);
            div {
                height: 100%;
                width: px2rem(50);
                border: px2rem(1) solid #ddd;
                margin-right: px2rem(3);
                border-radius: px2rem(6);
                background-color: white;
                transition: all 0.2s ease-in-out;
            }
            .red {
                background-color: #f31616;
            }

            .orange {
                background-color: orange;
            }

            .green {
                background-color: #62e464;
            }
        }

        .strength-box-focus {
            display: flex;
        }
    }
}
</style>
