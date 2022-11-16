
export class Storage {
  constructor (private engine: globalThis.Storage) {
    sessionStorage
  }

  /**
   * 在storage中设置值
   * @param {string} key 需要设置的key
   * @param {string} val 需要设置的key
   */
  public set (key: string, val: any) {
    val = typeof val === 'string' ? val : JSON.stringify(val)
    this.engine.setItem(key, val)
  }

  /**
   * 在storage中获取key对应的值
   * @param {string} key 需要获取的key
   * @return {T | null} 获取结果
   */
  public get<T = any> (key: string): T | null {
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
   * 移除指定的key
   * @param {string} key 需要移除的key
   */
  public remove (key: string) {
    localStorage.removeItem(key)
  }

  /**
   * 判断storage中是否存在对应的key
   * @param {string} key 需要查询的key
   * @return {boolean} 查询结果
   */
  public has (key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * 清空本地存储
   */
  public clear () {
    localStorage.clear()
  }
}
