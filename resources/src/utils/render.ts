import { MultiFrameAssets, SingleFrameAssets } from './frameAssets'
import { Application, Graphics } from 'pixi.js'
import { dev } from './mode'
import { createDownloadDiv, createDownloadGlyph } from './link'
import { application } from './application'

const grid = (
  dataset: MultiFrameAssets,
  alpha: number = 0.75) => {
  const width = dataset.srcWidth
  const height = dataset.srcHeight

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

export const renderSingle = (app: Application, opts: SingleFrameAssets) => {
  app.stage.addChild(opts.data)
  app.renderer.resize(opts.width, opts.height)
  app.renderer.render(app.stage)
  document.body.appendChild(createDownloadDiv(app, opts.name))
  if (opts.glyph) {
    document.body.appendChild(createDownloadGlyph(opts.glyph, opts.name))
  }
  app.stage.removeChildren()
}

export const renderMulti = (app: Application, opts: MultiFrameAssets) => {
  if (dev()) {
    opts.data = grid(opts).data
  }
  renderSingle(app, opts)
  const appMulti = application()
  appMulti.renderer.resize(opts.srcWidth, opts.srcHeight)
  let frames = 0
  appMulti.ticker.maxFPS = 30
  appMulti.ticker.add(() => {
    appMulti.stage.removeChildren()
    appMulti.stage.addChild(opts.tick(frames))
    frames++
    if (frames >= opts.frames) {
      frames = 0
    }
  })
  document.body.appendChild(appMulti.view as HTMLCanvasElement)
}
