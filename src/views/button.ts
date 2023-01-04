type ButtonOption = {} & Omit<g.FilledRectParameterObject, 'cssColor'> & Partial<{'cssColor': string}>

export class Button extends g.FilledRect {
  private touched: boolean
  private pushed: boolean
  private pointID: number | null

  constructor (opts: ButtonOption) {
    super({
      cssColor: opts?.cssColor ?? '#d2b48c',
      touchable: true,
      ...opts
    })
    this.touched = false
    this.pushed = false
    this.pointID = null
    this.onPointDown.add(e => {
      if (this.pointID === null) {
        this.touched = true
        this.pointID = e.pointerId
      }
    })
    this.onPointMove.add(e => {
      if (e.pointerId === this.pointID) {
        if (
          e.point.x + e.startDelta.x > 0 &&
          e.point.x + e.startDelta.x < this.width &&
          e.point.y + e.startDelta.y > 0 &&
          e.point.y + e.startDelta.y < this.height
        ) {
          // in area
        } else {
          // out of area
          this.touched = false
        }
      }
    })
    this.onPointUp.add(e => {
      if (e.pointerId === this.pointID) {
        if (
          e.point.x + e.startDelta.x > 0 &&
          e.point.x + e.startDelta.x < this.width &&
          e.point.y + e.startDelta.y > 0 &&
          e.point.y + e.startDelta.y < this.height
        ) {
          // in area
          this.pushed = true
        } else {
          // out of area
        }
        this.touched = false
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
}
