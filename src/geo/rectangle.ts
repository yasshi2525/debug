import { Bounds, BoundsObject, isBoundsObject } from '../utils/bounds'

type RectangleFieldOption = {
  initialBounds?: Bounds | BoundsObject
}
export class RectangleField {
  private readonly bounds: Bounds

  constructor (opts: RectangleFieldOption = {}) {
    if (opts.initialBounds != null) {
      this.bounds = isBoundsObject(opts.initialBounds) ? new Bounds(opts.initialBounds) : new Bounds(opts.initialBounds)
    } else {
      this.bounds = new Bounds()
    }
  }

  getBounds () {
    return this.bounds
  }
}
