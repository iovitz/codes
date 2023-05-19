export class Queen<D> {
  private queue: Array<D> = []

  /**
   * 队列长度
   */
  get size () {
    return this.dequeue.length
  }

  /**
   * 清空queue中数据
   */
  public clear () {
    this.queue = []
  }

  /**
   * 往队列中插入数据
   * @param item 需要被插入到队列中的数据
   * @return 插入数据后的数组长度
   */
  public enqueue (item: D): number {
    return this.queue.unshift(item)
  }

  /**
   * 从队列中取出一个数据
   * @returns 取出的数据
   */
  public dequeue () {
    return this.queue.pop()
  }

  /**
   * 把队列转换成字符串
   * @returns 转换后的字符串
   */
  public toString () {
    return this.queue.toString()
  }
}
