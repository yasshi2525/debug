import { GameContext, RunnerV3_g as g } from '@akashic/headless-akashic'
import { setUp, tearDown } from './__helper/launch'

describe('main', () => {
  let context: GameContext<3>
  let scene: g.Scene

  beforeEach(async () => {
    ({ context, scene } = await setUp())
    context.step()
  })

  afterEach(async () => {
    await tearDown(context)
  })

  it('ゲーム開始時に虫が生成される', () => {
    const layer = scene.children.find(e => e.tag === 'game')!
    expect(layer).toBeDefined()
    expect(layer).toBeInstanceOf(g.E)
    expect(layer.children).toHaveLength(6)
  })
})
