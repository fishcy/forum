import { type AxiosRequestConfig } from 'axios'
import apiInstance from './instance/apiInstance'

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

export async function getArticleDetail(data: any, config: AxiosRequestConfig = {}) {
    return await apiInstance.post('/article-detail', data, config)
}
