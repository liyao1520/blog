/**
 * 本地存储封装模块
 */
export const getItem: (name: string) => any = (name) => {
  const data = window.localStorage.getItem(name)

  //data 可能不是 JSON 格式字符串
  if (data == null) {
    return null
  } else {
    try {
      return JSON.parse(data)
    } catch {
      return data
    }
  }
}

export const setItem: (name: string, value: any) => void = (name, value) => {
  // 如果 value 是对象，就把 value 转为 JSON 格式字符串再存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem: (name: string) => void = (name) => {
  window.localStorage.removeItem(name)
}

//测试一下
