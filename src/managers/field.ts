import { RectangleField } from '../geo/rectangle'
import { GameManager } from './game'
import { FieldCollision } from '../geo/collision'
import { LinkedList } from '../utils/linkedList'
import { Bug } from '../views/bug'

type FieldManagerOption = {
  field: RectangleField
  collision: FieldCollision
  layer: g.E
}

export class FieldManager {
  private readonly field: RectangleField
  private readonly collision: FieldCollision
  private readonly layer: g.E

  private readonly bugs: LinkedList<Bug>

  constructor (opts: FieldManagerOption) {
    this.field = opts.field
    this.collision = opts.collision
    this.layer = opts.layer
    this.bugs = new LinkedList()
  }

  init (gameManager: GameManager) {
    gameManager.onGenerated.add(bug => {
      this.add(bug)
    })
  }

  start () {
    this.layer.onUpdate.add(() => {
      this.collision.validate()
      this.step()
    })
  }

  add (bug: Bug) {
    const removeLocal = this.bugs.add(bug)
    const { remove } = this.collision.add(bug)
    bug.onDestroy.addOnce(() => {
      removeLocal()
      remove()
    })
  }

  private step () {
    this.bugs.forEach(bug => bug.step())
  }
}
