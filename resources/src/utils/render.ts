import { ImageSet } from './imageSet'
import { Application, Graphics } from 'pixi.js'
import { dev } from './mode'
import { createDownloadDiv, createDownloadGlyph } from './link'

const grid = (
  dataset: ImageSet,
  size: number | { width: number; height: number },
  alpha: number = 0.75) => {
  const width = (typeof size === 'number') ? size : size.width
  const height = (typeof size === 'number') ? size : size.height

  for (let y = 0; y < dataset.height / height; y++) {
    for (let x = 0; x < dataset.width / width; x++) {
      const g = new Graphics()
      g.lineStyle(1, 0xffffff, alpha)
      g.drawRect(x * width + 1, y * height + 1, width - 2, height - 2)
      dataset.data.addChild(g)
    }
  }
  return dataset
}

export const render = (app: Application, opts: ImageSet) => {
  if (dev()) {
    opts.data = grid(opts, opts.size).data
  }

  app.stage.addChild(opts.data)
  app.renderer.resize(opts.width, opts.height)
  app.renderer.render(app.stage)
  document.body.appendChild(createDownloadDiv(app, opts.name))
  if (opts.glyph) {
    document.body.appendChild(createDownloadGlyph(opts.glyph, opts.name))
  }
  app.stage.removeChildren()
}
