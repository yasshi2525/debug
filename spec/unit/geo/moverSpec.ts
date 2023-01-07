import { Mover } from '../../../src/geo/mover'
import { VertexObject } from '../../../src/geo/vertex'
import { Point } from '../../../src/utils/point'

describe('mover', () => {
  it('速度に従い前進する', () => {
    const mover = new Mover({
      vertex: new VertexObject({ initialLocation: new Point(50, 50) }),
      initialVelocity: new Point(1, 2)
    })
    mover.step()
    expect(mover.getLocation().getLocation().get()).toEqual({ x: 51, y: 52 })
  })
})
