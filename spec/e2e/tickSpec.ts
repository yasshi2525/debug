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

  it('ゲーム起動時、残り時間が設定される', () => {
    const timeLabel = scene.children.find(e => e.tag === 'time')!
    expect(timeLabel).toBeInstanceOf(g.Label)
    expect((timeLabel as g.Label).text).toBe('TIME: 60')
  })

  it('時間経過後、残り時間が0になる', async () => {
    const timeLabel = scene.children.find(e => e.tag === 'time')!
    await context.advance(60000)
    expect((timeLabel as g.Label).text).toBe('TIME: 0')
  })
})
