export class Queen<D> {
  private queue: Array<D> = []

  enqueue (item: D) {
    return this.queue.unshift(item)
  }

  dequeue (item: D) {
    return this.queue.pop()
  }
}
