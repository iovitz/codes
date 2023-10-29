export class Singleton {
  public static instance = new Singleton()

  private constructor() {}

  public someBusinessLogic() {
    // ...
  }
}
