// 浏览器唯一标识, 以下是cookie
const keyUUID = 'uuid'

// 开发环境直接用Domain，生产环境用线上地址
let domain = document.domain
if (process.env.NODE_ENV === 'production') {
  domain = '.iovitz.com'
}

class Cookier {
  /**
   * 设置cookie的值
   * @param cname cookie的名字
   * @param cvalue cookie的值
   * @param second 有效时间, 单位: 秒
   * @param path 可选参数
   * @param domain 可选参数
   */
  setCookie (key: string, value: string, second: number, path: string) {
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
   * 获得cookie的值
   * @param cname cookie的名字
   * @returns {string}
   */
  getCookie (key: string) {
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
   * 为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
   * @param name cookie的名
   */
  delCookie (key: string) {
    const date = new Date()
    date.setTime(date.getTime() - 86400000)
    // eslint-disable-next-line no-param-reassign
    document.cookie = `${key}=; expires=${date.toUTCString()};domain=${domain};path=/`
  }
}

export default new Cookier()
