import { dev } from './mode'
import { Application } from 'pixi.js'

export const application = () => {
  return (dev())
    ? new Application({
      backgroundColor: 0x000000,
      preserveDrawingBuffer: true,
      antialias: true
    })
    : new Application({
      backgroundAlpha: 0,
      preserveDrawingBuffer: true,
      antialias: true
    })
}
