export class Singleton {
  public static instance: Singleton

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }

    return Singleton.instance
  }

  public someBusinessLogic() {
    // ...
  }
}
