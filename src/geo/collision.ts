import { RectangleField } from './rectangle'
import { Movable } from './mover'
import { LinkedList } from '../utils/linkedList'

type FieldCollisionOption = {
  field: RectangleField
}

export class FieldCollision {
  private readonly field: RectangleField
  private readonly objects: LinkedList<Movable>

  constructor (opts: FieldCollisionOption) {
    this.field = opts.field
    this.objects = new LinkedList<Movable>()
  }

  add (mover: Movable) {
    return {
      remove: this.objects.add(mover),
      validate: () => this._validate(mover)
    }
  }

  validate () {
    this.objects.forEach(m => this._validate(m))
  }

  private _validate (mover: Movable) {
    const area = this.field.getBounds()
    const pos = mover.getLocation().getLocation()
    const v = mover.getVelocity()
    if (pos.getX() <= area.left() && v.getX() < 0) {
      v.inverseX()
    }
    if (pos.getX() >= area.right() && v.getX() > 0) {
      v.inverseX()
    }
    if (pos.getY() <= area.top() && v.getY() < 0) {
      v.inverseY()
    }
    if (pos.getY() >= area.bottom() && v.getY() > 0) {
      v.inverseY()
    }
  }
}
