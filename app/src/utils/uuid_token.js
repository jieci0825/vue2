// 按需导入时，可以用as关键字重命名
import { v4 as uuidv4 } from 'uuid'

export const getUUID = () => {
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if (!uuid_token) {
    uuid_token = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  // 最后返回
  return uuid_token
}
