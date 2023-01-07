import { RectangleField } from '../geo/rectangle'
import { isPointObject, Point, PointObject } from '../utils/point'

type DebuggerOption = {
  field: RectangleField
}

export class Debugger {
  private readonly field: RectangleField
  private loc: Point | null
  private coolDown: number | null

  constructor (opts: DebuggerOption) {
    this.field = opts.field
    this.loc = null
    this.coolDown = null
  }

  start(x: number, y: number): boolean
  // eslint-disable-next-line no-dupe-class-members
  start(loc: PointObject): boolean
  // eslint-disable-next-line no-dupe-class-members
  start(loc: Point): boolean

  // eslint-disable-next-line no-dupe-class-members
  start (arg1: number | PointObject | Point, arg2?: number) {
    if (arg1 instanceof Point) {
      return this._start(arg1.getX(), arg1.getY())
    } else if (isPointObject(arg1)) {
      return this._start(arg1.x, arg1.y)
    } else if (arg2 != null) {
      return this._start(arg1, arg2)
    }
  }

  step () {
    if (this.coolDown != null) {
      this.coolDown--
      if (this.coolDown < 0) {
        this.coolDown = null
        this.loc = null
      }
    }
  }

  available () {
    return this.coolDown == null
  }

  getLocation () {
    return this.loc
  }

  private _start (x: number, y: number) {
    if (!this.field.getBounds().contains(x, y)) {
      return true
    }
    if (this.coolDown != null) {
      return false
    }
    this.loc = new Point(x, y)
    this.coolDown = 10
    return true
  }
}
