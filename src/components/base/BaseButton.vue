<template>
    <ElButton type="primary" plain @click="emit('click')">
        <slot></slot>
    </ElButton>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped></style>
