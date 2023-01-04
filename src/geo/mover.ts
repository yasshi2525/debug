import { VertexObject } from './vertex'
import { Point, PointObject } from '../utils/point'

type MoverOption = {
  vertex: VertexObject,
  initialVelocity?: Readonly<PointObject> | Point
}

export class Mover {
  private readonly vertex: VertexObject
  private readonly velocity: Point

  constructor (opts: MoverOption) {
    this.vertex = opts.vertex
    this.velocity = new Point(opts.initialVelocity)
  }

  getLocation () {
    return this.vertex
  }

  getVelocity () {
    return this.velocity
  }
}
