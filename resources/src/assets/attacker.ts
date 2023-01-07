import { MultiFrameAssets } from '../utils/frameAssets'
import { Container, Sprite } from 'pixi.js'
import { GlowFilter, OutlineFilter } from 'pixi-filters'

const width = 200
const height = 100
const spriteSize = 85
const frames = 10

const drawAttacker = (tick: number) => {
  const item = Sprite.from('images/attacker.png')
  item.anchor.set(0.5, 0.5)
  item.localTransform
    .rotate(-tick / frames * Math.PI / 2)
    .scale(spriteSize / item.width, spriteSize / item.height)
    .translate(width / 2, height / 2)
    .translate((1 - tick / frames) * (width - height) / 2, 0)
  item.filters = [
    new OutlineFilter(5, 0xffffff, 1),
    new GlowFilter({ color: 0x888888, quality: 1 })
  ]
  return item
}

export const createAttacker = (opts: {
  name: string
}): MultiFrameAssets => {
  const data = new Container()
  for (let i = 0; i < frames; i++) {
    const item = drawAttacker(i)
    item.localTransform.translate(width * i, 0)
    data.addChild(item)
  }
  return {
    name: opts.name,
    data,
    frames,
    width: width * frames,
    height,
    srcWidth: width,
    srcHeight: height,
    tick: i => drawAttacker(i)
  }
}
