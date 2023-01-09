import { Bug } from '../../../src/views/bug'
import { prepare } from '../__helper/mock'
import { RectangleField } from '../../../src/geo/rectangle'
import { Bounds } from '../../../src/utils/bounds'
import { FieldCollision } from '../../../src/geo/collision'
import { FieldManager } from '../../../src/managers/field'

prepare()

describe('fieldManager', () => {
  let scene: g.Scene
  let field: RectangleField
  let collision: FieldCollision
  let layer: g.E

  beforeEach(async () => {
    scene = await load()
    field = new RectangleField({ initialBounds: new Bounds(0, 0, 100, 100) })
    collision = new FieldCollision({ field })
    layer = new g.E({ scene, parent: scene })
  })

  afterEach(() => {
    unload()
  })

  it('時間経過すると虫が移動する', () => {
    const manager = new FieldManager({ field, collision, layer })
    manager.start()
    expect(layer.onUpdate).toHaveLength(1)
    const bug = new Bug({ scene, x: 50, y: 50 })
    manager.add(bug)
    context.step()
    expect(bug.x).not.toBe(50)
    expect(bug.y).not.toBe(50)
  })

  it('虫が削除されると、stepの対象外になる', () => {
    const manager = new FieldManager({ field, collision, layer })
    manager.start()
    const bug = new Bug({ scene, x: 50, y: 50 })
    manager.add(bug)
    context.step()
    const { x, y } = bug.getLocation().getLocation().get()
    bug.destroy()
    context.step()
    expect(bug.getLocation().getLocation().get()).toEqual({ x, y })
  })
})
