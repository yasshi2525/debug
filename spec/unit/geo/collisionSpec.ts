import { VertexObject } from '../../../src/geo/vertex'
import { RectangleField } from '../../../src/geo/rectangle'
import { Mover } from '../../../src/geo/mover'
import { FieldCollision } from '../../../src/geo/collision'

describe('collision', () => {
  it.each([
    ['右', 100, 50, [1, 0], [-1, 0]],
    ['左', 0, 50, [-1, 0], [1, 0]],
    ['下', 50, 100, [0, 1], [0, -1]],
    ['上', 50, 0, [0, -1], [0, 1]]
  ])('%s側の壁にあたって反転', (name: string, x: number, y: number, [v1x, v1y], [v2x, v2y]) => {
    const field = new RectangleField({ initialBounds: { x: 0, y: 0, width: 100, height: 100 } })
    const vertex = new VertexObject()
    const mover = new Mover({ vertex, initialVelocity: { x: v1x, y: v1y } })
    const collision = new FieldCollision({ field })
    const { validate } = collision.add(mover)
    // まだ%name%にいける
    vertex.getLocation().set(x - v1x, y - v1y)
    validate()
    expect(mover.getVelocity().get()).toEqual({ x: v1x, y: v1y })
    // 反転
    vertex.getLocation().set(x, y)
    validate()
    expect(mover.getVelocity().get()).toEqual({ x: v2x, y: v2y })
  })
})
