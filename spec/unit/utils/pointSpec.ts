import { Point } from '../../../src/utils/point'

describe('point', () => {
  it('constructor - default arguments', () => {
    const obj = new Point()
    expect(obj).toBeDefined()
    expect(obj.getX()).toBe(0)
    expect(obj.getY()).toBe(0)
    expect(obj.get()).toEqual({ x: 0, y: 0 })
  })

  it('constructor - number', () => {
    const obj = new Point(1, 2)
    expect(obj).toBeDefined()
    expect(obj.getX()).toBe(1)
    expect(obj.getY()).toBe(2)
    expect(obj.get()).toEqual({ x: 1, y: 2 })
  })

  it('constructor - object', () => {
    const obj = new Point({ x: 1, y: 2 })
    expect(obj).toBeDefined()
    expect(obj.getX()).toBe(1)
    expect(obj.getY()).toBe(2)
    expect(obj.get()).toEqual({ x: 1, y: 2 })
  })

  it('constructor - point instance', function () {
    const obj = new Point(new Point(1, 2))
    expect(obj).toBeDefined()
    expect(obj.getX()).toBe(1)
    expect(obj.getY()).toBe(2)
    expect(obj.get()).toEqual({ x: 1, y: 2 })
  })

  it('setter', () => {
    const obj = new Point(1, 2)
    obj.setX(3).setY(4)
    expect(obj.get()).toEqual({ x: 3, y: 4 })
    obj.set(5, 6)
    expect(obj.get()).toEqual({ x: 5, y: 6 })
    obj.set({ x: 7, y: 8 })
    expect(obj.get()).toEqual({ x: 7, y: 8 })
    obj.set(new Point(9, 10))
    expect(obj.get()).toEqual({ x: 9, y: 10 })
  })

  it('add / sub', () => {
    const obj = new Point(1, 2)
    obj.add(3, 4).add({ x: 5, y: 6 }).add(new Point(7, 8))
    expect(obj.get()).toEqual({ x: 16, y: 20 })
    obj.sub(3, 4).sub({ x: 5, y: 6 }).sub(new Point(7, 8))
    expect(obj.get()).toEqual({ x: 1, y: 2 })
  })

  it('multiply / unitize / length', () => {
    const obj = new Point(3, 4)
    expect(obj.length()).toBeCloseTo(5)
    obj.multiply(2)
    expect(obj.get()).toEqual({ x: 6, y: 8 })
    obj.unitize()
    expect(obj.length()).toBeCloseTo(1)
  })

  it('0-length point unit vector', () => {
    const obj = new Point()
    expect(() => obj.unitize()).toThrow()
  })

  it('inverse', () => {
    const obj = new Point(1, 2)
    obj.inverseX()
    expect(obj.get()).toEqual({ x: -1, y: 2 })
    obj.inverseY()
    expect(obj.get()).toEqual({ x: -1, y: -2 })
  })
})
