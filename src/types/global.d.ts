export interface Article {
    article_id: string
    title: string
    brief_content: string
    author_id: string
    create_time: number
    like_num: number
    view_num: number
}

export interface Response<T = any> {
    msg: string
    data: T
}
