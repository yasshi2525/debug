import { isPointObject, Point, PointObject, validate } from './point'

export type BoundsObject = {
  x: number,
  y: number,
  width: number,
  height: number
}

export const isBoundsObject = (obj: unknown): obj is BoundsObject =>
  typeof obj === 'object' &&
  obj != null &&
  ('x' in obj && typeof obj.x === 'number') &&
  ('y' in obj && typeof obj.y === 'number') &&
  ('width' in obj && typeof obj.width === 'number') &&
  ('height' in obj && typeof obj.height === 'number')

export class Bounds {
  private readonly bounds: BoundsObject

  constructor()
  constructor(x: number, y: number, w: number, h: number)
  constructor(opts: Readonly<BoundsObject>)
  constructor(bounds: Bounds)
  constructor(bounds: Readonly<BoundsObject> | Bounds | undefined)

  constructor (arg1?: Readonly<BoundsObject> | Bounds | number | undefined, arg2?: number, arg3?: number, arg4?: number) {
    if (arguments.length === 0) {
      this.bounds = { x: 0, y: 0, width: 0, height: 0 }
    } else if (arg1 == null) {
      this.bounds = { x: 0, y: 0, width: 0, height: 0 }
    } else if (arg1 instanceof Bounds) {
      this.bounds = { x: arg1.bounds.x, y: arg1.bounds.y, width: arg1.bounds.width, height: arg1.bounds.height }
    } else if (isBoundsObject(arg1)) {
      this.bounds = { x: arg1.x, y: arg1.y, width: arg1.width, height: arg1.height }
    } else if (typeof arg2 === 'number' && typeof arg3 === 'number' && typeof arg4 === 'number') {
      this.bounds = { x: arg1, y: arg2, width: arg3, height: arg4 }
    } else {
      throw new Error(`invalid arguments: ${arguments}`)
    }
    this.modify()
  }

  get (): Readonly<BoundsObject> {
    return this.bounds
  }

  set(bounds: Readonly<BoundsObject>): Bounds

  // eslint-disable-next-line no-dupe-class-members
  set(bounds: Bounds): Bounds

  // eslint-disable-next-line no-dupe-class-members
  set(x: number, y: number, width: number, height: number): Bounds

  // eslint-disable-next-line no-dupe-class-members
  set (arg1: Readonly<BoundsObject> | Bounds | number, arg2?: number, arg3?: number, arg4?: number) {
    if (arg1 instanceof Bounds) {
      this.bounds.x = arg1.bounds.x
      this.bounds.y = arg1.bounds.y
      this.bounds.width = arg1.bounds.width
      this.bounds.height = arg1.bounds.height
    } else if (isBoundsObject(arg1)) {
      this.bounds.x = arg1.x
      this.bounds.y = arg1.y
      this.bounds.width = arg1.width
      this.bounds.height = arg1.height
    } else if (typeof arg2 === 'number' && typeof arg3 === 'number' && typeof arg4 === 'number') {
      this.bounds.x = arg1
      this.bounds.y = arg2
      this.bounds.width = arg3
      this.bounds.height = arg4
    }
    this.modify()
    return this
  }

  move(x: number, y: number): Bounds
  // eslint-disable-next-line no-dupe-class-members
  move(loc: Readonly<PointObject>): Bounds
  // eslint-disable-next-line no-dupe-class-members
  move(loc: Point): Bounds

  // eslint-disable-next-line no-dupe-class-members
  move (arg1: number | Readonly<PointObject> | Point, arg2?: number) {
    if (arg1 instanceof Point) {
      this.bounds.x += arg1.getX()
      this.bounds.y += arg1.getY()
    } else if (isPointObject(arg1)) {
      this.bounds.x += arg1.x
      this.bounds.y += arg1.y
    } else if (typeof arg2 === 'number') {
      this.bounds.x += arg1
      this.bounds.y += arg2
    }
    this.modify()
    return this
  }

  top () {
    return this.bounds.y
  }

  bottom () {
    return this.bounds.y + this.bounds.height
  }

  left () {
    return this.bounds.x
  }

  right () {
    return this.bounds.y + this.bounds.width
  }

  width () {
    return this.bounds.width
  }

  height () {
    return this.bounds.height
  }

  private modify () {
    if (!validate(this.bounds.x) || !validate(this.bounds.y) || !validate(this.bounds.width) || !validate(this.bounds.height)) {
      throw new Error(`invalid bounds: ${this.bounds}`)
    }
    if (this.bounds.width < 0 || this.bounds.height < 0) {
      throw new Error(`invalid bounds size: (${this.bounds.width}, ${this.bounds.height})`)
    }
  }
}
