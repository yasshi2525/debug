import { GameContext } from '@akashic/headless-akashic'
import { RunnerV3_g as g } from '@akashic/headless-driver/lib/runner/v3'
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

  it('ゲーム起動時、スコアが設定される', () => {
    const scoreLabel = scene.children.find(e => e.tag === 'score')!
    expect(scoreLabel).toBeInstanceOf(g.Label)
    expect((scoreLabel as g.Label).text).toBe('SCORE: 0')
  })
})
