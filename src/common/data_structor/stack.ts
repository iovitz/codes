export class Stack<D> {
  private stack: Array<D> = []

  /**
   * 队列长度
   */
  get size () {
    return this.stack.length
  }

  /**
   * 清空queue中数据
   */
  public clear () {
    this.stack = []
  }

  /**
   * 往栈中加入数据
   * @param item 需要被加入到栈中的数据
   * @return 加入数据后的栈的长度
   */
  push (item: D) {
    this.stack.push()
  }

  /**
   * 从栈中取出一个数据
   * @returns 取出的数据
   */
  pop (item: D) {
    this.stack.push()
  }

  /**
   * 把栈转换成字符串
   * @returns 转换后的字符串
   */
  public toString () {
    return this.stack.toString()
  }
}
