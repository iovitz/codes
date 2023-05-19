// 开发环境直接用Domain，生产环境用线上地址
let domain = document.domain

// As Needed
if (process.env.NODE_ENV === 'production') {
  domain = 'xxx.com'
}

/**
 * 进行Cookie相关操作
 */
export class Cookie {
  /**
   * 删除仓库
   * @param {string} key key
   * @param {string} value 123
   * @param {number} second 123
   * @param {string} path 123123
   */
  public setCookie (key: string, value: string, second: number, path: string) {
    // 找到html文件前的 / 索引
    const index = window.location.pathname.lastIndexOf('/')
    const currentIndex = window.location.pathname.slice(0, index)
    // eslint-disable-next-line no-param-reassign
    path = path || currentIndex
    if (!second) {
      document.cookie = `${key}=${value};path=${path};domain=${domain}`
    } else {
      const date = new Date()
      date.setTime(date.getTime() + (172800 + second) * 1000)
      document.cookie = `${key}=${value};expires=${date.toUTCString()};path=${path};domain=${domain}`
    }
  }

  /**
   * 从cookie中获取值
   * @param {string} key 需要获取的key
   * @return {string} 获取到的值
   */
  public getCookie (key: string) {
    // 以分号分割cookie并返回一个数组
    const res = document.cookie.split(';')
    for (let i = 0; i < res.length; i += 1) {
      const temp = res[i].split('=')
      if (temp[0].trim() === key) {
        return temp[1]
      }
    }
    return ''
  }

  /**
   * 删除cookie
   * @param {string} key 需要删除cookie的key
   */
  public delCookie (key: string) {
    const date = new Date()
    date.setTime(date.getTime() - 86400000)
    document.cookie = `${key}=; expires=${date.toUTCString()};domain=${domain};path=/`
  }
}
