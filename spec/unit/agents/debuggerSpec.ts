import { RectangleField } from '../../../src/geo/rectangle'
import { Bounds } from '../../../src/utils/bounds'
import { Debugger } from '../../../src/agents/debugger'
import { Point } from '../../../src/utils/point'

describe('debugger', () => {
  let field: RectangleField

  beforeEach(() => {
    field = new RectangleField({ initialBounds: new Bounds(0, 0, 100, 100) })
  })

  it('叩き終わると再び叩ける', () => {
    const debug = new Debugger({ field })
    expect(debug.available()).toBe(true)
    expect(debug.getLocation()).toBeNull()

    expect(debug.start(50, 50)).toBe(true)
    expect(debug.available()).toBe(false)
    expect(debug.getLocation()!.get()).toEqual({ x: 50, y: 50 })

    for (let i = 0; i < 10; i++) {
      debug.step()
      expect(debug.available()).toBe(false)
    }

    debug.step()
    expect(debug.available()).toBe(true)
    expect(debug.getLocation()).toBeNull()
  })

  it('叩いている間は操作無効', () => {
    const debug = new Debugger({ field })
    expect(debug.start(50, 50)).toBe(true)
    expect(debug.start({ x: 50, y: 50 })).toBe(false)
    expect(debug.start(new Point(50, 50))).toBe(false)
  })

  it('領域外を叩いた場合、無反応', () => {
    const debug = new Debugger({ field })
    debug.start(120, 50)
    expect(debug.available()).toBe(true)
    expect(debug.getLocation()).toBeNull()
  })
})
