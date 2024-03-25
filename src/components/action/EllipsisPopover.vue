<template>
    <div class="ellipsis-popover">
        <ElPopover
            :trigger="trigger"
            :teleported="false"
            :popper-class="popperClass"
            :popper-style="`min-width: ${width}; width: ${width}`"
            ref="popperRef"
        >
            <template #reference>
                <font-awesome-icon :icon="['fas', 'ellipsis']" @click="handleClick" />
            </template>
            <template #default>
                <slot></slot>
            </template>
        </ElPopover>
    </div>
</template>

<script setup lang="ts">
import type { TooltipTriggerType } from 'element-plus'
import { onMounted, ref } from 'vue'

withDefaults(
    defineProps<{
        width?: string
        trigger?: TooltipTriggerType
        popperClass?: string
    }>(),
    {
        width: '100px',
        trigger: 'hover'
    }
)

const emit = defineEmits(['click'])

const handleClick = (event: Event) => {
    event.preventDefault()
    emit('click', event)
}

const popperRef = ref()
onMounted(() => {
    console.log(popperRef.value)
})
</script>

<style lang="scss" scoped></style>
