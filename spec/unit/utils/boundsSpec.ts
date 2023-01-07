import { Bounds } from '../../../src/utils/bounds'
import { Point } from '../../../src/utils/point'

describe('bounds', () => {
  it('constructor', () => {
    expect(new Bounds().get()).toEqual({ x: 0, y: 0, width: 0, height: 0 })
    expect(new Bounds(1, 2, 3, 4).get()).toEqual({ x: 1, y: 2, width: 3, height: 4 })
    expect(new Bounds({ x: 1, y: 2, width: 3, height: 4 }).get()).toEqual({ x: 1, y: 2, width: 3, height: 4 })
  })

  it('set', () => {
    const obj = new Bounds()
    obj.set(1, 2, 3, 4)
    expect(obj.get()).toEqual({ x: 1, y: 2, width: 3, height: 4 })
    obj.set({ x: 5, y: 6, width: 7, height: 8 })
    expect(obj.get()).toEqual({ x: 5, y: 6, width: 7, height: 8 })
  })

  it('move', () => {
    const obj = new Bounds(1, 2, 3, 4)
    obj.move(5, 6)
    expect(obj.get()).toEqual({ x: 6, y: 8, width: 3, height: 4 })
    obj.move({ x: 7, y: 8 })
    expect(obj.get()).toEqual({ x: 13, y: 16, width: 3, height: 4 })
    obj.move(new Point(9, 10))
    expect(obj.get()).toEqual({ x: 22, y: 26, width: 3, height: 4 })
  })

  it('top / bottom / left / right', () => {
    const obj = new Bounds(1, 2, 3, 4)
    expect(obj.top()).toBe(2)
    expect(obj.bottom()).toBe(6)
    expect(obj.left()).toBe(1)
    expect(obj.right()).toBe(5)
  })

  it.each([
    ['左', -1, 0, false],
    ['右', 2, 0, false],
    ['上', 0, -1, false],
    ['下', 0, 2, false],
    ['中', 0.5, 0.5, true]
  ])('contains (%s)', (_, x: number, y: number, expected: boolean) => {
    const obj = new Bounds(0, 0, 1, 1)
    expect(obj.contains(x, y)).toBe(expected)
    expect(obj.contains({ x, y })).toBe(expected)
    expect(obj.contains(new Point(x, y))).toBe(expected)
  })
})
