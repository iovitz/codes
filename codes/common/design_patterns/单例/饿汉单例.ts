class SingleTon {
  private static instance = new SingleTon()
  public static getInstance () {
    return this.instance
  }
  private constructor () {
    // ...
  }
}

export {}
