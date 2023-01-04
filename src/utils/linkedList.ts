type ListElement<T> = {
  prev: ListElement<T> | null;
  next: ListElement<T> | null;
  value: T;
}

export type RemoveElementFunc = () => void

export class LinkedList<T> {
  private headElm: ListElement<T> | null
  private tailElm: ListElement<T> | null
  private len: number

  constructor () {
    this.len = 0
    this.headElm = null
    this.tailElm = null
  }

  head () {
    return this.headElm?.value
  }

  tail () {
    return this.tailElm?.value
  }

  add (v: T): RemoveElementFunc {
    const elm: ListElement<T> = {
      prev: null,
      next: null,
      value: v
    }

    if (this.tailElm === null) {
      this.headElm = this.tailElm = elm
    } else {
      this.tailElm.next = elm
      elm.prev = this.tailElm
      this.tailElm = elm
    }
    this.len++

    let removed = false
    return () => {
      if (removed) {
        throw new Error(`element is already removed: ${elm.value})`)
      }
      if (this.headElm === elm) {
        this.headElm = elm.next
      }
      if (this.tailElm === elm) {
        this.tailElm = elm.prev
      }

      if (elm.prev) {
        elm.prev.next = elm.next
      }
      if (elm.next) {
        elm.next.prev = elm.prev
      }
      this.len--
      removed = true
    }
  }

  /**
   * ループ中に要素を削除しても大丈夫
   * @param fn
   */
  forEach (fn: (v: T, i: number) => void) {
    let current = this.headElm
    let i = 0
    while (current !== null) {
      fn(current.value, i)
      current = current.next
      i++
    }
  }

  find (fn: (v: T, i: number) => boolean) {
    let current = this.headElm
    let i = 0
    while (current !== null) {
      if (fn(current.value, i)) {
        return current.value
      }
      current = current.next
      i++
    }
    return null
  }

  get (index: number) {
    let current = this.headElm
    for (let i = 0; i < index; i++) {
      if (!current) {
        throw new Error(`list has no value index: ${index}`)
      }
      current = current.next
    }
    if (!current) {
      throw new Error(`list has no value index: ${index}`)
    }
    return current.value
  }

  length () {
    return this.len
  }

  clear () {
    this.len = 0
    this.headElm = null
    this.tailElm = null
  }

  toArray () {
    const arr: T[] = []
    let current = this.headElm
    while (current !== null) {
      arr.push(current.value)
      current = current.next
    }
    return arr
  }
}
