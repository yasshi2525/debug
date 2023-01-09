import { Bubble } from '../../../src/views/bubble'

describe('bubble', () => {
  let scene: g.Scene

  beforeEach(async () => {
    scene = await load()
  })

  afterEach(() => {
    unload()
  })

  it('押下したら消える', async () => {
    const bubble = new Bubble({ scene, x: 0, y: 0, width: 100, height: 100, parent: scene })
    client.sendPointDown(150, 50, 0)
    context.step()
    expect(bubble.destroyed()).toBe(false)

    client.sendPointDown(50, 50, bubble.id)
    context.step()
    expect(bubble.destroyed()).toBe(true)
  })
})
