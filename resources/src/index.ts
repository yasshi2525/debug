import { application } from './utils/application'
import { createBitmapFont } from './assets/bitmapFont'
import { renderMulti, renderSingle } from './utils/render'
import { createBug } from './assets/bug'
import { loadFont } from './utils/font'
import { loadImage } from './utils/loader'
import { createAttacker } from './assets/attacker'
import { createFlower } from './assets/flower'
import { createLabel } from './utils/text';

(async () => {
  const app = application()
  await loadFont()
  await loadImage()
  renderSingle(app, createLabel({ name: 'assets/main/score', text: '得点：', size: 50 }))
  renderSingle(app, createLabel({ name: 'assets/main/time', text: '残り：', size: 50 }))
  renderSingle(app, createFlower({ name: 'assets/main/flower' }))
  renderMulti(app, createAttacker({ name: 'assets/main/attacker' }))
  renderSingle(app, createBug({ name: 'assets/main/bug' }))
  renderSingle(app, createBitmapFont({
    name: 'assets/shared/number',
    color: 0x000000,
    chars: ' +-0123456789',
    size: 50
  }))
})()
