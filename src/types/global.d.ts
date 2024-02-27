export interface UploadImageResponse {
    originalname: string
    url: string
    size: number
    filename: string
}

export interface UploadArticleResponse {
    title: string
    article_id: string
}

export interface ArticleEntry {
    article_id: string
    title: string
    brief_content: string
    cover_image: string
    author_id: string
    author_name: string
    create_time: number
    like_num: number
    view_num: number
}

interface ArticleInfo {
    author_id: string
    author_name: string
    title: string
    text_content: string
    html_content: string
    create_time: number
}

export interface ArticleDetail {
    article_id: string
    article_info: ArticleInfo
}

export interface UserInfo {
    username: string
    avatar: string
}

export interface Response<T = any> {
    msg: string
    data: T
}
