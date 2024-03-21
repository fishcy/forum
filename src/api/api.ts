import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import apiInstance from './instance/apiInstance'
import type {
    ArticleDetail,
    ArticleEntry,
    ChatEntry,
    ChatRecord,
    ChatRecordResponse,
    Comment,
    Reply,
    Response,
    UploadArticleResponse,
    UploadImageResponse,
    UserInfo
} from '@/types/global.d.ts'

export async function patchThemeColor(
    data: any,
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse> {
    return await apiInstance.patch('/themeColor', data, config)
}

export async function uploadImage(
    data: any,
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<UploadImageResponse>>> {
    config.headers = { ...config.headers, 'Content-Type': 'multipart/form-data' }
    return await apiInstance.post('/upload-image', data, config)
}

export async function uploadArticle(
    data: any,
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<UploadArticleResponse>>> {
    return await apiInstance.post('/upload-article', data, config)
}
export async function getRecommendArticle(
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<ArticleEntry>>> {
    return await apiInstance.get('/recommend', config)
}

export async function getArticleDetail(
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<ArticleDetail>>> {
    return await apiInstance.get('/article-detail', config)
}

export async function getOwnArticles(
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<{ own_articles: ArticleEntry[] }>>> {
    return await apiInstance.get('/own-articles', config)
}

export async function getCaptcha(config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    config.withCredentials = true
    return await apiInstance.get('/get-captcha', config)
}

export async function getUserInfo(
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<UserInfo>>> {
    return await apiInstance.get('/get-user-info', config)
}

export async function thumbsUp(
    data: any,
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response>> {
    return await apiInstance.post('/thumbs-up', data, config)
}

export async function cancelThumbsUp(
    data: any,
    config: AxiosRequestConfig = {}
): Promise<AxiosRequestConfig<Response>> {
    return await apiInstance.post('/cancel-thumbs-up', data, config)
}

export async function publishComment(
    data: any,
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<Comment>>> {
    return await apiInstance.post('/publish-comment', data, config)
}

export async function getComments(
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<Comment[]>>> {
    return await apiInstance.get('/get-comments', config)
}

export async function publishReply(
    data: any,
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<Reply>>> {
    return await apiInstance.post('/publish-reply', data, config)
}

export async function getReplys(
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<Reply[]>>> {
    return await apiInstance.get('/get-replys', config)
}

export async function chatWithUser(
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response>> {
    return await apiInstance.get('/chat-with-user', config)
}

export async function getChatList(
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<ChatEntry[]>>> {
    return await apiInstance.get('/get-chat-list', config)
}

export async function getChatRecords(
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<ChatRecordResponse>>> {
    return await apiInstance.get('/get-chat-record', config)
}
