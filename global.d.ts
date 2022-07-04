
declare interface ApiReturn<T extends object> {
  status: boolean
  message: string
  data: T
}

declare interface UserInfo {
  // 用户名
  username: string
  // Token
  token: string
}

declare interface Article {
  // 文章标题
  title: string
  // 文章文件名（带 .md）
  filename: string
  // 文章内容（markdown）
  content: string
}

declare interface LoginApi {
  // 是否成功
  status: boolean
  // token
  token: string
}

declare interface UserApi {
  /**
   * 检查登录状态
   */
  state: () => Promise<ApiReturn<UserInfo>>
  /**
   * 登录
   * @params baseUrl 请求公共 url，最后不需要 "/"
   * @params username 用户名
   * @params password 密码 或 Token
   */
  login: (baseUrl: string, username: string, password: string) => Promise<ApiReturn<LoginApi>>
}

declare interface AddArticleApi {
  // 是否成功
  status: boolean
}

declare interface GetArticleApi {
  // 是否成功
  status: boolean
  // 数据
  articles: Article[]
}

declare interface UpdateArticleApi {
  // 是否成功
  status: boolean
}

declare interface DeleteArticleApi {
  // 是否成功
  status: boolean
}

declare interface PushArticleApi {
  // 是否成功
  status: boolean
}

declare interface ArticleApi {
  /**
   * 获取文章列表
   */
  get: () => Promise<ApiReturn<GetArticleApi>>
  /**
   * 添加文章
   * @params title 文章标题
   * @params filename 文章文件名（带 .md）
   * @params content 文章内容（markdown）
   */
  add: (title: string, filename: string, content: string) => Promise<ApiReturn<AddArticleApi>>
  /**
   * 修改文章
   * @params filename 文章文件名（带 .md）
   * @params content 文章新内容
   */
  update: (title: string, filename: string, content: string) => Promise<ApiReturn<UpdateArticleApi>>
  /**
   * 删除文章
   * @params filename 文章文件名（带 .md）
   */
  del: (filename: string) => Promise<ApiReturn<DeleteArticleApi>>
  /**
   * 更新文章
   */
  push: () => Promise<ApiReturn<PushArticleApi>>
}

declare interface Image {
  id: string
  filename: string
  url: string
  updatedAt: number
}

declare interface UploadImageApi {
  // 是否成功
  status: boolean
  // 路径
  urls: string[]
}

declare interface DeleteImageApi {
  // 是否成功
  status: boolean
}

declare interface GetImageApi {
  // 是否成功
  status: boolean
  // 路径
  images: Image[]
}


declare interface ImageApi {
  upload: (file: File[]) => Promise<ApiReturn<UploadImageApi>>
  del: (id: string) => Promise<ApiReturn<DeleteImageApi>>
  get: () => Promise<ApiReturn<GetImageApi>>
}

declare interface API {
  user: UserApi
  article: ArticleApi
  image: ImageApi
}

declare interface Window {
  API: API
}
