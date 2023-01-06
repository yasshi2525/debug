import { application } from './utils/application'
import { createBitmapFont } from './assets/bitmapFont'
import { render } from './utils/render'
import { createBug } from './assets/bug'
import { loadFont } from './utils/font'
import { loadImage } from './utils/loader';

(async () => {
  const app = application()
  await loadFont()
  await loadImage()

  render(app, createBug({ name: 'assets/main/bug' }))
  render(app, createBitmapFont({
    name: 'assets/shared/number',
    color: 0x000000,
    chars: '0123456789',
    size: 40
  }))
})()
