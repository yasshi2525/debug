import { GameContext } from '@akashic/headless-akashic'
import * as path from 'path'

export const setUp = async () => {
  const context = new GameContext<3>({
    gameJsonPath: path.join(__dirname, '../../..', 'game.json')
  })
  const client = await context.getGameClient()
  const game = client.game
  await client.advanceUntil(
    () => game.scene()!.local !== 'full-local' && game.scene()!.name !== '_bootstrap'
  )
  const scene = game.scene()!
  return {
    context,
    client,
    game,
    scene
  }
}

export const tearDown = async (context: GameContext) => {
  await context.destroy()
}
