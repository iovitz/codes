export class LinkedListItem<D> {
  constructor (
    public data: D,
    private _next: LinkedListItem<D> | null = null,
  ) {}

  get next () {
    return this._next
  }

  setNext (item: LinkedListItem<D> | null) {
    this._next = item
  }
}

export class LinkedList<D> {
  private _head: LinkedListItem<D> = new LinkedListItem(null as unknown as D)

  constructor () {
  }

  get head () {
    return this._head
  }

  insert (data: D): boolean
  insert (data: D, prev: LinkedListItem<D>): boolean
  insert (data: D, prev?: LinkedListItem<D>) {
    let cursor: typeof this.head | null = this.head
    while (cursor?.next) {
      if (prev && cursor === prev) {
        break
      }
      cursor = cursor.next
    }
    if (!cursor) {
      return false
    }
    cursor.setNext(new LinkedListItem(data))
    return true
  }

  remove (item: LinkedListItem<D>) {
    let cursor: typeof this.head | null = this.head
    while (cursor && cursor.next !== item) {
      cursor = cursor?.next || null
    }
    if (!cursor) return false
    cursor.setNext(cursor.next?.next || null)
    return true
  }

  has (item: LinkedListItem<D>) {
    let cursor: typeof this.head | null = this.head
    if (!cursor) {
      return false
    }
    while (cursor) {
      if (cursor === item) {
        return true
      }
      cursor = cursor.next
    }
    return false
  }
}
