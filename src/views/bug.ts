import { image } from '../managers/resource'
import { Movable, Mover } from '../geo/mover'
import { VertexObject } from '../geo/vertex'
import { Point } from '../utils/point'

type BugOption = {} & Omit<g.SpriteParameterObject, 'src'>

export class Bug extends g.Sprite implements Movable {
  readonly onDestroy: g.Trigger<void>
  private readonly engine: Mover

  constructor (opts: BugOption) {
    super({
      src: image(opts.scene, '/assets/main/bug_generated.png'),
      ...opts
    })
    this.onDestroy = new g.Trigger()
    this.engine = new Mover({
      vertex: new VertexObject({
        initialLocation: new Point(this.x, this.y)
      }),
      initialVelocity: new Point(
        g.game.random.generate(),
        g.game.random.generate()
      )
    })
  }

  step () {
    this.engine.step()
    this.x = this.getLocation().getLocation().getX()
    this.y = this.getLocation().getLocation().getY()
    this.modified()
  }

  getLocation () {
    return this.engine.getLocation()
  }

  getVelocity () {
    return this.engine.getVelocity()
  }

  destroy (destroySurface?: boolean) {
    super.destroy(destroySurface)
    this.onDestroy.fire()
  }
}
