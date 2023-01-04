import { GameClient, GameContext } from '@akashic/headless-akashic'

declare global {
  // eslint-disable-next-line no-unused-vars
  const context: GameContext<3>
  // eslint-disable-next-line no-unused-vars
  const client: GameClient<3>
  /**
   * 引数に Scene の指定があれば、その Scene を load します。
   * なければ、 load 済み Scene を返します
   */
  // eslint-disable-next-line no-unused-vars
  const load: (scene?: g.Scene) => Promise<g.Scene>
  // eslint-disable-next-line no-unused-vars
  const unload: () => void
}

export {}
