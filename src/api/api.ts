import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import apiInstance from './instance/apiInstance'
import type {
    ArticleDetail,
    ArticleEntry,
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
