class LocalStorage {
  /**
   * 设置localStorage中的值
   * @param key 预备存储到localStorage中的key
   * @param val 预备存储到localStorage中的value
   */
  public set (key: string, val: any) {
    val = typeof val === 'string' ? val : JSON.stringify(val)
    localStorage.setItem(key, val)
  }

  /**
   * 根据key获取value
   * @param key 想要获取的item的key
   * @returns key对应的value
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
   * 在localStorage中移除某个item
   * @param key 想要删除的item的key
   */
  delete (key: string) {
    localStorage.removeItem(key)
  }

  /**
   * 判断localStorage中是否存在某个item
   * @param key 想要查找的item对应的key
   * @returns
   */
  has (key: string) {
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
