<template>
    <div class="create-footer">
        <div class="footer-content">
            <ElButton>存草稿</ElButton>
            <ElButton @click="drawer = true">发布</ElButton>
        </div>
    </div>
    <ElDrawer v-model="drawer" :direction="'btt'" :show-close="false" size="40%">
        <template #header>发布文章</template>
        <template #default>
            <div class="panel">
                <div class="form-item">
                    <div class="label">文章封面：</div>
                    <div class="form-item-content">
                        <UploadCoverImage v-model:image-url="coverImage"></UploadCoverImage>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <ElButton @click="submit">确认发布</ElButton>
        </template>
    </ElDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Editor } from '@tiptap/vue-3'
import { uploadArticle } from '@/api'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
    editor: {
        type: Editor,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const drawer = ref(false)

const coverImage = ref('')

const submit = () => {
    if (!props.title || props.editor.isEmpty) {
        ElMessage({
            type: 'warning',
            message: '标题或文章内容不能为空',
            grouping: true
        })
        return
    }
    uploadArticle({
        title: props.title,
        textContent: props.editor.getText(),
        htmlContent: props.editor.getHTML(),
        coverImage: coverImage.value
    })
        .then((res) => {
            if (res.data.msg === '成功') {
                router.push({
                    path: '/published',
                    query: {
                        title: res.data.data.title,
                        article_id: res.data.data.article_id
                    }
                })
            } else {
                ElMessage({
                    type: 'warning',
                    message: res.data.msg,
                    grouping: true
                })
            }
        })
        .catch((err) => {})
}
</script>

<style lang="scss" scoped>
.create-footer {
    height: 60px;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.04);
    .footer-content {
        max-width: 930px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
    }
}

.panel {
    .form-item {
        display: flex;
        .label {
            font-weight: 400;
            font-size: 14px;
            line-height: 32px;
            text-align: right;
            color: #1d2129;
            width: 80px;
            -webkit-box-flex: 0;
            -ms-flex: none;
            flex: none;
        }

        .form-item-content {
        }
    }
}
</style>
