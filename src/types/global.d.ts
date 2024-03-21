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
    is_like: number
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

interface CommentInfo {
    comment_content: string
    comment_image: string
    create_time: number
    like_num: number
    is_like: number
}

interface CommentUserInfo {
    user_id: string
    user_name: string
    avatar: string
}

interface ReplyInfo {
    reply_comment: string
    reply_image: string
    create_time: number
    like_num: number
    is_like: number
}

export interface Reply {
    reply_id: string
    reply_info: ReplyInfo
    user_info: CommentUserInfo
    reply_user: CommentUserInfo
}

export interface Comment {
    comment_id: string
    comment_info: CommentInfo
    user_info: CommentUserInfo
    reply_infos: Array<Reply>
}

type MessageType = 'login' | 'heart_beat' | 'private' | 'group'

export interface WebSocketMessage {
    type: MessageType
    from: string
    to: string
    content: string
    creat_time?: number
}

export interface ChatEntry {
    user_id: string
    user_name: string
    avatar: string
    content: string
    create_time: number
}

export interface ChatRecord {
    sender_user_id: string
    receiver_user_id: string
    content: string
    create_time: number
}

export interface ChatRecordResponse {
    totalPage: number
    messages: ChatRecord[]
}
