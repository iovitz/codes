class LazySingleTon {
  private static instance: LazySingleTon

  public static getInstance () {
    if (!this.instance) {
      this.instance = new LazySingleTon()
    }
    return this.instance
  }
  private constructor () {
    // ...
  }
}

export {}
