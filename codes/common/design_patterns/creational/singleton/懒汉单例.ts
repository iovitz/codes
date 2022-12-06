class SingleTon {
  private static instance: SingleTon
  public static getInstance () {
    if (!this.instance) {
      this.instance = new SingleTon()
    }
    return this.instance
  }
  private constructor () {
    // ...
  }
}

export {}
