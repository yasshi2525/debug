export type PointObject = { x: number, y: number }

export const isPointObject = (obj: unknown): obj is PointObject =>
  typeof obj === 'object' &&
  obj != null &&
  ('x' in obj && typeof obj.x === 'number') &&
  ('y' in obj && typeof obj.y === 'number')

export const validate = (n: number) => n != null && !Number.isNaN(n) && Number.isFinite(n)

export class Point {
  private readonly loc: PointObject
  private readonly setFn = (x: number, y: number) => {
    this.loc.x = x
    this.loc.y = y
  }

  private readonly addFn = (x: number, y: number) => {
    this.loc.x += x
    this.loc.y += y
  }

  private readonly subFn = (x: number, y: number) => {
    this.loc.x -= x
    this.loc.y -= y
  }

  private lengthCache: number | null = null

  constructor()
  constructor(x: number, y: number)
  constructor(loc: Readonly<PointObject>)
  constructor(loc: Point)
  constructor(loc: Readonly<PointObject> | Point | undefined)

  constructor (arg1?: number | Readonly<PointObject> | Point | undefined, arg2?: number) {
    if (arguments.length === 0) {
      this.loc = { x: 0, y: 0 }
    } else if (arg1 == null) {
      this.loc = { x: 0, y: 0 }
    } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      this.loc = { x: arg1, y: arg2 }
    } else if (arg1 instanceof Point) {
      this.loc = { x: arg1.getX(), y: arg1.getY() }
    } else if (isPointObject(arg1)) {
      this.loc = { x: arg1.x, y: arg1.y }
    } else {
      throw new Error(`invalid constructor arguments: ${arguments}`)
    }
    this.modify()
  }

  getX () {
    return this.loc.x
  }

  getY () {
    return this.loc.y
  }

  get (): Readonly<PointObject> {
    return this.loc
  }

  setX (v: number) {
    this.loc.x = v
    this.modify()
    return this
  }

  setY (v: number) {
    this.loc.y = v
    this.modify()
    return this
  }

  set (x: number, y: number): Point
  // eslint-disable-next-line no-dupe-class-members
  set (loc: Readonly<PointObject>): Point
  // eslint-disable-next-line no-dupe-class-members
  set (loc: Point): Point

  // eslint-disable-next-line no-dupe-class-members
  set (arg1: number | Readonly<PointObject> | Point, arg2?: number) {
    this.op(arg1, arg2, this.setFn)
    this.modify()
    return this
  }

  add (x: number, y: number): Point
  // eslint-disable-next-line no-dupe-class-members
  add (loc: Readonly<PointObject>): Point
  // eslint-disable-next-line no-dupe-class-members
  add (loc: Point): Point

  // eslint-disable-next-line no-dupe-class-members
  add (arg1: number | Readonly<PointObject> | Point, arg2?: number) {
    this.op(arg1, arg2, this.addFn)
    this.modify()
    return this
  }

  sub (x: number, y: number): Point
  // eslint-disable-next-line no-dupe-class-members
  sub (loc: Readonly<PointObject>): Point
  // eslint-disable-next-line no-dupe-class-members
  sub (loc: Point): Point

  // eslint-disable-next-line no-dupe-class-members
  sub (arg1: number | Readonly<PointObject> | Point, arg2?: number) {
    this.op(arg1, arg2, this.subFn)
    this.modify()
    return this
  }

  multiply (rate: number) {
    this.loc.x *= rate
    this.loc.y *= rate
    this.modify()
    return this
  }

  unitize () {
    const len = this.length()
    if (len === 0) {
      throw new Error('failed to unitize because length is zero')
    }
    this.multiply(1 / len)
    this.modify()
    return this
  }

  inverseX () {
    this.loc.x = -this.loc.x
    this.modify()
    return this
  }

  inverseY () {
    this.loc.y = -this.loc.y
    this.modify()
    return this
  }

  length () {
    if (this.lengthCache === null) {
      this.lengthCache = Math.sqrt(this.loc.x * this.loc.x + this.loc.y * this.loc.y)
    }
    return this.lengthCache
  }

  clone () {
    return new Point(this.loc)
  }

  private op (arg1: number | Readonly<PointObject> | Point, arg2: number | undefined, fn: (x: number, y: number) => void) {
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      fn(arg1, arg2)
    } else if (arg1 instanceof Point) {
      fn(arg1.getX(), arg1.getY())
    } else if (isPointObject(arg1)) {
      fn(arg1.x, arg1.y)
    } else {
      throw new Error(`invalid arguments: ${arguments}`)
    }
  }

  private modify () {
    if (!validate(this.loc.x)) {
      throw new Error(`invalid value was specified to x: ${this.loc.x}`)
    }
    if (!validate(this.loc.y)) {
      throw new Error(`invalid value was specified to y: ${this.loc.y}`)
    }
    this.lengthCache = null
  }
}
