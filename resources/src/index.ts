import { application } from './utils/application'
import { createBitmapFont } from './assets/bitmapFont'
import { render } from './utils/render'
import FontFaceObserver from 'fontfaceobserver'

const app = application()

const font = new FontFaceObserver('mplus')

font.load().then(() => {
  render(app, createBitmapFont({
    name: 'assets/shared/number',
    color: 0x000000,
    chars: '0123456789',
    size: 40
  }))
})
