import { Point, PointObject } from '../utils/point'

type VertexObjectOption = {
  initialLocation?: Readonly<PointObject> | Point
}

export class VertexObject {
  private readonly loc: Point

  constructor (opts: VertexObjectOption = {}) {
    this.loc = new Point(opts.initialLocation)
  }

  getLocation () {
    return this.loc
  }
}
