import { image } from '../managers/resource'
import { frames } from '../utils/array'

type AttackerOption = {} & Omit<g.SpriteParameterObject, 'src'>

export class Attacker extends g.FrameSprite {
  constructor (opts: AttackerOption) {
    super({
      ...opts,
      width: 200,
      height: 100,
      frames: frames(10),
      src: image(opts.scene, '/assets/main/attacker_generated.png'),
      anchorX: 0.5,
      anchorY: 0.5,
      loop: false
    })
  }
}
