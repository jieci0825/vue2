// 对外暴露一个函数
// 本地存储token
export const setToken = (token) => {
  localStorage.setItem('TOKEN', token)
}

// 在本地存储中获取token
export const getToken = () => {
  return localStorage.getItem('TOKEN')
}

// 清除本地存储的token
export const removeToken = () => {
  return localStorage.removeItem('TOKEN')
}
