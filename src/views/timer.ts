import { font, image } from '../managers/resource'

type TimerOption = {
  scene: g.Scene,
  layer: g.E,
  initial: number
}

export class TimerView extends g.E {
  readonly onExpire: g.Trigger<void>

  private remainFrame: number
  private readonly key: g.Sprite
  private readonly value: g.Label

  constructor (opts: TimerOption) {
    super({
      scene: opts.scene,
      parent: opts.layer,
      tag: 'timer'
    })
    this.onExpire = new g.Trigger()
    this.remainFrame = opts.initial * g.game.fps
    this.key = new g.Sprite({
      scene: opts.scene,
      parent: this,
      x: g.game.width - 250,
      y: 50,
      src: image(opts.scene, '/assets/main/time_generated.png')
    })
    this.value = new g.Label({
      scene: opts.scene,
      parent: this,
      x: g.game.width - 100,
      y: 50,
      font: font(opts.scene, '/assets/shared/number_generated'),
      text: this.text()
    })
  }

  init () {
    //
  }

  start () {
    this.onUpdate.add(() => {
      const old = this.value.text
      const current = this.text()
      if (old !== current) {
        this.value.text = current
        this.value.invalidate()
      }
      if (this.remainFrame === 0) {
        this.onExpire.fire()
        return true
      }
      this.remainFrame--
    })
  }

  time () {
    return Math.floor(this.remainFrame / g.game.fps)
  }

  private text () {
    return `${this.time()}`.padStart(2, ' ')
  }
}
