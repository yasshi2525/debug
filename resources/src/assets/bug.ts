import { ImageSet } from '../utils/imageSet'
import { Container, Graphics, Sprite } from 'pixi.js'
import { GlowFilter, KawaseBlurFilter, OutlineFilter } from 'pixi-filters'

const spriteSize = 25
const size = 100
const padding = (size - spriteSize) / 2

export const createBug = (opts: {
  name: string
}): ImageSet => {
  const data = new Container()
  const circle = new Graphics()
  circle.lineStyle(1, 0xdc143c, 0.5)
  circle.drawCircle(size / 2, size / 2, size * 0.4)
  circle.filters = [
    new GlowFilter({ color: 0xff6347, quality: 1 }),
    new GlowFilter({ color: 0xe9967a, quality: 1 })
  ]
  data.addChild(circle)
  const item = Sprite.from('images/bug.png')
  item.localTransform
    .scale(spriteSize / item.width, spriteSize / item.height)
    .translate(padding, padding)
  item.filters = [
    new OutlineFilter(5, 0xffffff, 1),
    new GlowFilter({ color: 0x888888, quality: 1 }),
    new KawaseBlurFilter(0.125)
  ]
  data.addChild(item)
  return {
    name: opts.name,
    data,
    width: size,
    height: size,
    size
  }
}
