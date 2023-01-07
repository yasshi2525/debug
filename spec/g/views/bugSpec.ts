import { prepare } from '../__helper/mock'
import { Bug } from '../../../src/views/bug'

prepare()

describe('bug', () => {
  let scene: g.Scene

  beforeEach(async () => {
    scene = await load()
  })

  afterEach(() => {
    unload()
  })

  it('座標指定なしのとき、(0, 0) に位置する', () => {
    const bug = new Bug({ scene })
    expect(bug.getLocation().getLocation().get()).toEqual({ x: 0, y: 0 })
  })
})
