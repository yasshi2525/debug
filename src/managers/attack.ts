import { RectangleField } from '../geo/rectangle'
import { LinkedList } from '../utils/linkedList'
import { Bug } from '../views/bug'
import { Button } from '../views/button'
import { Attacker } from '../views/attacker'
import { GameManager } from './game'

type AttackManagerOption = {
  scene: g.Scene,
  layer: g.E,
  field: RectangleField,
}

export class AttackManager {
  private readonly scene: g.Scene
  private readonly layer: g.E
  private readonly field: RectangleField
  private readonly bugs: LinkedList<Bug>
  private readonly sensor: Button
  private readonly attacker: Attacker

  constructor (opts: AttackManagerOption) {
    this.scene = opts.scene
    this.layer = opts.layer
    this.field = opts.field
    this.bugs = new LinkedList()
    this.sensor = new Button({
      scene: opts.scene,
      parent: opts.layer,
      ...opts.field.getBounds().get()
    })
    this.attacker = new Attacker({
      scene: opts.scene,
      parent: opts.layer,
      ...opts.field.getBounds().get(),
      hidden: true
    })
  }

  init (gameManager: GameManager) {
    gameManager.onGenerated.add(bug => {
      this.addBug(bug)
    })
  }

  start () {
    this.sensor.onStarted.add(loc => {
      this.attacker.x = loc.x
      this.attacker.y = loc.y
      this.attacker.frameNumber = 0
      this.attacker.modified()
    })
    this.sensor.onMoved.add(loc => {
      this.attacker.x = loc.x
      this.attacker.y = loc.y
      this.attacker.modified()
    })
    this.sensor.onTouched.add(v => {
      if (v) { this.attacker.show() } else { this.attacker.hide() }
    })

    this.sensor.onPushed.add(loc => {
      this.attacker.show()
      this.attacker.start()
      this.sensor.disable(true)
      this.attacker.onFinish.addOnce(() => {
        const aSize = this.attacker.height
        const target = this.bugs.find(b => {
          return b.x - aSize / 2 < loc.x && loc.x < b.x + aSize / 2 &&
            b.y - aSize / 2 < loc.y && loc.y < b.y + aSize / 2
        })
        if (target != null) {
          target.destroy()
        }
        this.attacker.hide()
        this.sensor.disable(false)
      })
    })
  }

  addBug (bug: Bug) {
    const remove = this.bugs.add(bug)
    bug.onDestroy.addOnce(() => remove())
  }
}
