import { RectangleField } from '../../../src/geo/rectangle'
import { GameManager } from '../../../src/managers/game'
import { prepare } from '../__helper/mock'

prepare()

describe('gameManager', () => {
  let field: RectangleField
  let scene: g.Scene
  let layer: g.E

  beforeEach(async () => {
    scene = await load()
    layer = new g.E({ scene })
    scene.append(layer)
    field = new RectangleField({ initialBounds: { x: 0, y: 0, width: 100, height: 100 } })
  })

  afterEach(() => {
    unload()
  })

  it('開始時に引数の数だけ虫が生成される', () => {
    const game = new GameManager({
      scene,
      field,
      initialBugNumber: 6,
      layer
    })
    game.start()
    expect(layer.children).toHaveLength(6)
  })

  it('時間経過すると虫の数が増える', () => {
    const game = new GameManager({
      scene,
      field,
      initialBugNumber: 6,
      incrementIntervalTick: 10,
      layer
    })
    game.start()
    context.step()
    for (let i = 0; i < 10; i++) {
      context.step()
      expect(layer.children).toHaveLength(6)
    }
    context.step()
    expect(layer.children).toHaveLength(7)
  })
})
