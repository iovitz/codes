/**
 * 操作本地LocalStorage
 */
class LocalStorage {
  /**
   * 往LocalStorage中写入一个值
   * @param {string} key
   * @param {string} val
   */
  public set (key: string, val: any) {
    val = typeof val === 'string' ? val : JSON.stringify(val)
    localStorage.setItem(key, val)
  }

  /**
   * 往LocalStorage中获取一个值
   * @param {string} key 需要获取的key
   * @return {T} 获取到的值
   */
  public get<T = any> (key: string) {
    const val = localStorage.getItem(key)
    if (val) {
      try {
        return JSON.parse(val) as T
      } catch (e) {
        return (val as unknown as T)
      }
    } else {
      return null
    }
  }


  /**
   * 往LocalStorage中获取一个值
   * @param {string} key 需要删除的key
   */
  delete (key: string) {
    localStorage.removeItem(key)
  }

  /**
   * 判断LocalStorage中是否已经包含某个Key
   * @param {string} key 需要删除的key
   * @return {boolean}
   */
  public has (key: string) {
    return this.get(key) !== null
  }

  /**
   * 清空localStorage
   */
  public clear () {
    localStorage.clear()
  }
}

export default new LocalStorage()
