import { prepare } from '../__helper/mock'
import { TimerView } from '../../../src/views/timer'

prepare()

describe('timer', () => {
  let scene: g.Scene
  let layer: g.E
  let timer: TimerView

  beforeEach(async () => {
    scene = await load()
    layer = new g.E({ scene, parent: scene, tag: 'timer' })
    timer = new TimerView({ scene, layer, initial: 60 })
  })

  afterEach(() => {
    unload()
  })

  it('初期化するとLabelが出現する', () => {
    timer.init()
    expect(layer.children).toHaveLength(1)
    expect(timer.children).toHaveLength(2)
    expect(timer.children![0]).toBeInstanceOf(g.Sprite)
    expect(timer.children![1]).toBeInstanceOf(g.Label)
    expect(timer.time()).toBe(60)
  })

  it('開始すると残り時間が減り始める', () => {
    timer.init()
    timer.start()
    for (let i = 0; i < g.game.fps; i++) {
      context.step()
      expect(timer.time()).toBe(59)
    }
    context.step()
    expect(timer.time()).toBe(58)
  })

  it('終了時刻を迎えるとカウントダウンが終わる', async () => {
    timer.init()
    timer.start()
    await context.advance(60000)
    expect(timer.time()).toBe(0)
    await context.advance(10000)
    expect(timer.time()).toBe(0)
  })
})
