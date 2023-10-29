class Point {
  constructor(private x: number, private y: number) {}

  clone() {
    return new Point(this.x, this.y)
  }
}
