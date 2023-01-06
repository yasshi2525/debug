import { GameContext } from '@akashic/headless-akashic'
import * as path from 'path'

const load = () => new GameContext<3>({
  gameJsonPath: path.join(__dirname, '../..', 'game.json')
})

describe('launch', () => {
  it('ゲームが起動する', async () => {
    const context = load()
    const client = await context.getGameClient()
    expect(client.type).toBe('active')

    const game = client.game
    expect(game.width).toBe(1280)
    expect(game.height).toBe(720)
    expect(game.fps).toBe(30)
    await context.destroy()
  })

  it('メインシーンがロードされる', async () => {
    const context = load()
    const client = await context.getGameClient()
    const game = client.game
    await client.advanceUntil(
      () => game.scene()!.local !== 'full-local' && game.scene()!.name !== '_bootstrap'
    )
    const scene = client.game.scene()
    expect(scene).toBeDefined()
    expect(scene?.name).toBe('main')
    await context.destroy()
  })
})
