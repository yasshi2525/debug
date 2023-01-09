import { SingleFrameAssets } from '../utils/frameAssets'
import { Container, Sprite } from 'pixi.js'
import { GlowFilter, OutlineFilter } from 'pixi-filters'

const spriteSize = 75
const size = 100
const padding = (size - spriteSize) / 2

export const createFlower = (opts: { name: string }): SingleFrameAssets => {
  const data = new Container()
  const item = Sprite.from('images/flower.png')
  item.localTransform
    .scale(spriteSize / item.width, spriteSize / item.height)
    .translate(padding, padding)
  item.filters = [
    new OutlineFilter(5, 0xffffff, 1),
    new GlowFilter({ color: 0xf0e68c, quality: 1 })
  ]
  data.addChild(item)
  return {
    name: opts.name,
    data,
    width: size,
    height: size
  }
}
