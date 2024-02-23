import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import apiInstance from './instance/apiInstance'
import type { Article, Response } from '@/types/global.d.ts'

export async function postThemeColor(data: any, config: AxiosRequestConfig = {}) {
    return await apiInstance.post('/themeColor', data, config)
}

export async function uploadImage(data: any, config: AxiosRequestConfig = {}) {
    config.headers = { ...config.headers, 'Content-Type': 'multipart/form-data' }
    return await apiInstance.post('/upload-image', data, config)
}

export async function uploadArticle(data: any, config: AxiosRequestConfig = {}) {
    return await apiInstance.post('/upload-article', data, config)
}
export async function getRecommendArticle(config: AxiosRequestConfig = {}) {
    return await apiInstance.get('/recommend', config)
}

export async function getArticleDetail(config: AxiosRequestConfig = {}) {
    return await apiInstance.get('/article-detail', config)
}

export async function getOwnArticles(
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Response<{ own_articles: Article[] }>>> {
    return await apiInstance.get('/own-articles', config)
}

export async function getCaptcha(config: AxiosRequestConfig = {}) {
    return await apiInstance.get('/get-captcha', config)
}
