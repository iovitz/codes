export class House {
  private styles: string[] = []

  public buildWall(material: string) {
    this.styles.push(`${material} wall`)
    return this
  }

  public buildWindow(material: string) {
    this.styles.push(`${material} window`)
    return this
  }

  public buildDoor(material: string) {
    this.styles.push(`${material} door`)
    return this
  }

  public buildFence(material: string) {
    this.styles.push(`${material} fence`)
    return this
  }

  show() {
    console.log(this.styles.join('\n'))
  }
}
