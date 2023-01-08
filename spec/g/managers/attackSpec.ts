import { RectangleField } from '../../../src/geo/rectangle'
import { prepare } from '../__helper/mock'
import { Bounds } from '../../../src/utils/bounds'
import { Bug } from '../../../src/views/bug'
import { AttackManager } from '../../../src/managers/attack'
import { Attacker } from '../../../src/views/attacker'

prepare()

describe('attackManager', () => {
  let field: RectangleField
  let scene: g.Scene
  let layer: g.E
  let manager: AttackManager
  let attacker: Attacker

  beforeEach(async () => {
    scene = await load()
    layer = new g.E({ scene, tag: 'attacker' })
    scene.append(layer)
    field = new RectangleField({ initialBounds: new Bounds(0, 0, 100, 100) })
    manager = new AttackManager({ scene, field, layer })
    attacker = layer.children![1] as Attacker
    manager.start()
  })

  afterEach(() => {
    unload()
  })

  it('有効領域をpointDownすると、ハエたたきが出現する', () => {
    expect(attacker.visible()).toBe(false)
    client.sendPointDown(50, 50, 1)
    context.step()
    expect(attacker.visible()).toBe(true)
  })

  it('有効領域をpointUpすると、ハエたたきアニメーションが開始する', () => {
    client.sendPointDown(50, 50, 1)
    context.step()
    client.sendPointUp(50, 50, 1)
    context.step()
    expect(attacker.frameNumber).toBeGreaterThan(0)
  })

  it('叩き終わるとそのときいた虫が消える', () => {
    const target = new Bug({ scene, x: 50, y: 50 })
    manager.addBug(target)

    client.sendPointDown(50, 50, 1)
    context.step()
    expect(attacker.visible()).toBe(true)
    expect(attacker.frameNumber).toBe(0)

    client.sendPointUp(50, 50, 1)
    context.step()
    expect(attacker.visible()).toBe(true)
    expect(attacker.frameNumber).toBe(1)
    expect(target.destroyed()).toBe(false)

    for (let i = 2; i < 10; i++) {
      context.step()
      expect(attacker.frameNumber).toBe(i)
      expect(target.destroyed()).toBe(false)
    }

    context.step()
    expect(target.destroyed()).toBe(true)
    expect(attacker.visible()).toBe(false)
  })

  it('たたき中はクリックしてもハエたたきが出現しない', () => {
    client.sendPointDown(50, 50, 1)
    context.step()
    expect(layer.children).toHaveLength(2)
    client.sendPointDown(75, 75, 2)
    context.step()
    expect(layer.children).toHaveLength(2)
  })
})
