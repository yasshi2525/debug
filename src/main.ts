import { GameMainParameterObject, RPGAtsumaruWindow } from './parameterObject'
import { GameManager } from './managers/game'
import { RectangleField } from './geo/rectangle'
import { Bounds } from './utils/bounds'
import { FieldManager } from './managers/field'
import { FieldCollision } from './geo/collision'
import { AttackManager } from './managers/attack'
import { TimerView } from './views/timer'

declare const window: RPGAtsumaruWindow

export function main (param: GameMainParameterObject): void {
  const scene = new g.Scene({
    game: g.game,
    name: 'main',
    assetPaths: ['/assets/shared/**/*', '/assets/main/**/*']
  })

  let time = 60 // 制限時間
  if (param.sessionParameter.totalTimeLimit) {
    time = param.sessionParameter.totalTimeLimit // セッションパラメータで制限時間が指定されたらその値を使用します
  }
  // 市場コンテンツのランキングモードでは、g.game.vars.gameState.score の値をスコアとして扱います
  g.game.vars.gameState = { score: 0 }
  scene.onLoad.add(() => {
    // ここからゲーム内容を記述します
    const field = new RectangleField({
      initialBounds: new Bounds(100, 100, 600, 400)
    })
    const gameLayer = new g.E({ scene, tag: 'game', parent: scene })
    const gameManager = new GameManager({
      scene,
      layer: gameLayer,
      field,
      initialBugNumber: 6,
      incrementIntervalTick: 30
    })

    const collision = new FieldCollision({ field })
    const fieldLayer = new g.E({ scene, tag: 'field', parent: scene })
    const fieldManager = new FieldManager({
      layer: fieldLayer,
      field,
      collision
    })
    fieldManager.init(gameManager)

    const attackerLayer = new g.E({ scene, tag: 'attacker', parent: scene })
    const attackManager = new AttackManager({ scene, field, layer: attackerLayer })
    attackManager.init(gameManager)

    const timerLayer = new g.E({ scene, tag: 'timer', parent: scene })
    const timer = new TimerView({ scene, layer: timerLayer, initial: time })
    timer.init()

    gameManager.start()
    fieldManager.start()
    attackManager.start()
    timer.start()

    // フォントの生成
    const font = new g.DynamicFont({
      game: g.game,
      fontFamily: 'sans-serif',
      size: 48
    })

    // スコア表示用のラベル
    const scoreLabel = new g.Label({
      scene,
      text: 'SCORE: 0',
      font,
      fontSize: font.size / 2,
      textColor: 'black',
      tag: 'score'
    })
    scene.append(scoreLabel)

    timer.onExpire.add(() => {
      if (param.isAtsumaru) {
        const boardId = 1
        window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId, g.game.vars.gameState.score).then(function () {
          window.RPGAtsumaru.experimental.scoreboards.display(boardId)
        })
      }
    })
  })
  g.game.pushScene(scene)
}
