import { ElMessage } from 'element-plus'

export default function sendRequest<T extends object>(res: ApiReturn<T>) {
  if (res.status) {
    return res.data
  }
  else {
    ElMessage({
      showClose: true,
      message: `请求错误：${res.message}`,
      type: 'error',
    })
  }
  return {} as T
}
