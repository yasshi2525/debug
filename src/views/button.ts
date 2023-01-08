import { PointObject } from '../utils/point'

type ButtonOption = {} & g.EParameterObject

export class Button extends g.E {
  readonly onStarted: g.Trigger<Readonly<PointObject>>
  readonly onMoved: g.Trigger<Readonly<PointObject>>
  readonly onTouched: g.Trigger<boolean>
  readonly onPushed: g.Trigger<Readonly<PointObject>>

  private disabled: boolean
  private touched: boolean
  private pushed: boolean
  private pointID: number | null

  constructor (opts: ButtonOption) {
    super({
      ...opts,
      touchable: true
    })
    this.onStarted = new g.Trigger()
    this.onMoved = new g.Trigger()
    this.onTouched = new g.Trigger()
    this.onPushed = new g.Trigger()
    this.disabled = false
    this.touched = false
    this.pushed = false
    this.pointID = null
    this.onPointDown.add(e => {
      if (this.disabled) {
        return
      }
      if (this.pointID === null) {
        this.touched = true
        this.pointID = e.pointerId
        this.onStarted.fire(this.pos(e.point))
        this.onTouched.fire(true)
      }
    })
    this.onPointMove.add(e => {
      if (this.disabled) {
        return
      }
      if (e.pointerId === this.pointID) {
        if (
          e.point.x + e.startDelta.x > 0 &&
          e.point.x + e.startDelta.x < this.width &&
          e.point.y + e.startDelta.y > 0 &&
          e.point.y + e.startDelta.y < this.height
        ) {
          if (!this.touched) {
            this.touched = true
            this.onTouched.fire(true)
          }
          this.onMoved.fire(this.pos(e.point, e.startDelta))
        } else {
          if (this.touched) {
            // out of area
            this.touched = false
            this.onTouched.fire(false)
          }
        }
      }
    })
    this.onPointUp.add(e => {
      if (this.disabled) {
        return
      }
      if (e.pointerId === this.pointID) {
        this.touched = false
        this.onTouched.fire(false)
        if (
          e.point.x + e.startDelta.x > 0 &&
          e.point.x + e.startDelta.x < this.width &&
          e.point.y + e.startDelta.y > 0 &&
          e.point.y + e.startDelta.y < this.height
        ) {
          // in area
          this.pushed = true
          this.onPushed.fire(this.pos(e.point, e.startDelta))
        } else {
          // out of area
        }
        this.pointID = null
      }
    })
  }

  isTouched () {
    return this.touched
  }

  isPushed () {
    return this.pushed
  }

  disable (v: boolean) {
    this.disabled = v
  }

  isDisabled () {
    return this.disabled
  }

  private pos (p: g.CommonOffset, d?: g.CommonOffset) {
    return {
      x: this.x + p.x + (d?.x ?? 0),
      y: this.y + p.y + (d?.y ?? 0)
    }
  }
}
