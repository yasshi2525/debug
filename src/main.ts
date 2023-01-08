import { GameMainParameterObject, RPGAtsumaruWindow } from './parameterObject'
import { GameManager } from './managers/game'
import { RectangleField } from './geo/rectangle'
import { Bounds } from './utils/bounds'
import { FieldManager } from './managers/field'
import { FieldCollision } from './geo/collision'
import { AttackManager } from './managers/attack'

declare const window: RPGAtsumaruWindow

export function main (param: GameMainParameterObject): void {
  const scene = new g.Scene({
    game: g.game,
    name: 'main',
    assetPaths: ['/assets/main/**/*']
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
    const gameLayer = new g.E({ scene, tag: 'game' })
    scene.append(gameLayer)

    const gameManager = new GameManager({
      scene,
      layer: gameLayer,
      field,
      initialBugNumber: 6,
      incrementIntervalTick: 30
    })

    const collision = new FieldCollision({ field })
    const fieldLayer = new g.E({ scene, tag: 'field' })
    scene.append(fieldLayer)

    const fieldManager = new FieldManager({
      layer: fieldLayer,
      field,
      collision
    })
    fieldManager.init(gameManager)

    const attackerLayer = new g.E({ scene, tag: 'attacker' })
    scene.append(attackerLayer)
    const attackManager = new AttackManager({ scene, field, layer: attackerLayer })
    attackManager.init(gameManager)

    gameManager.start()
    fieldManager.start()
    attackManager.start()

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

    // 残り時間表示用ラベル
    const timeLabel = new g.Label({
      scene,
      text: 'TIME: 0',
      font,
      fontSize: font.size / 2,
      textColor: 'black',
      x: 0.65 * g.game.width,
      tag: 'time'
    })
    scene.append(timeLabel)

    const updateHandler = (): void => {
      if (time <= 0) {
        // ゲームアツマール環境であればランキングを表示します
        if (param.isAtsumaru) {
          const boardId = 1
          window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId, g.game.vars.gameState.score).then(function () {
            window.RPGAtsumaru.experimental.scoreboards.display(boardId)
          })
        }
        scene.onUpdate.remove(updateHandler) // カウントダウンを止めるためにこのイベントハンドラを削除します
      }
      // カウントダウン処理
      time -= 1 / g.game.fps
      timeLabel.text = 'TIME: ' + Math.ceil(time)
      timeLabel.invalidate()
    }
    scene.onUpdate.add(updateHandler)
    // ここまでゲーム内容を記述します
  })
  g.game.pushScene(scene)
}
