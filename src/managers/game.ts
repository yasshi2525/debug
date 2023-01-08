import { RectangleField } from '../geo/rectangle'
import { Bug } from '../views/bug'

type GameManagerOption = {
  scene: g.Scene
  field: RectangleField,
  initialBugNumber: number,
  layer: g.E,
  incrementIntervalTick?: number
}

export class GameManager {
  readonly onGenerated: g.Trigger<Bug> = new g.Trigger()
  private readonly scene: g.Scene
  private readonly field: RectangleField
  private readonly initialBugNumber: number
  private readonly incrementIntervalTick: number | undefined
  private readonly layer: g.E
  private ageTick: number

  constructor (opts: GameManagerOption) {
    this.scene = opts.scene
    this.field = opts.field
    this.initialBugNumber = opts.initialBugNumber
    this.incrementIntervalTick = opts.incrementIntervalTick
    this.layer = opts.layer
    this.ageTick = 0
  }

  start () {
    for (let i = 0; i < this.initialBugNumber; i++) {
      this.generateBug()
    }

    let count = 0
    this.layer.onUpdate.add(() => {
      if (this.incrementIntervalTick != null && count > this.incrementIntervalTick) {
        this.generateBug()
        count = 0
      }
      count++
    })
  }

  private generateBug () {
    const b = this.field.getBounds()
    const bug = new Bug({
      scene: this.scene,
      x: b.left() + g.game.random.generate() * b.width(),
      y: b.top() + g.game.random.generate() * b.height(),
      anchorX: 0.5,
      anchorY: 0.5
    })
    this.layer.append(bug)
    this.onGenerated.fire(bug)
  }
}
