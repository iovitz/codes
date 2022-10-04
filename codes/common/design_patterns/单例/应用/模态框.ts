class Model {
  static instance = new Model
  private constructor (public visible = false) {

  }
  show () {
    this.visible = true
  }

  hide () {
    this.visible = true
  }
}

export default Model.instance
