import { image } from '../managers/resourceManager'

type BugOption = {} & Omit<g.SpriteParameterObject, 'src'>

export class Bug extends g.Sprite {
  constructor (opts: BugOption) {
    super({
      src: image(opts.scene, '/assets/main/bug.png'),
      ...opts
    })
  }
}
