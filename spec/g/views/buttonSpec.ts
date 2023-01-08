import { Button } from '../../../src/views/button'

describe('button', () => {
  let scene: g.Scene
  let button: Button

  beforeEach(async () => {
    scene = await load()
    button = new Button({ scene, x: 0, y: 0, width: 100, height: 100 })
    scene.append(button)
  })

  afterEach(() => {
    unload()
  })

  it('離した際に押下判定とする', () => {
    client.sendPointDown(50, 50, 1)
    context.step()
    expect(button.isTouched()).toBe(true)
    expect(button.isPushed()).toBe(false)

    client.sendPointUp(50, 50, 1)
    context.step()
    expect(button.isTouched()).toBe(false)
    expect(button.isPushed()).toBe(true)
  })

  it('異なるpointIDは無視する', () => {
    client.sendPointDown(50, 50, 1)
    context.step()
    expect(button.isTouched()).toBe(true)
    expect(button.isPushed()).toBe(false)

    client.sendPointDown(60, 60, 2)
    context.step()

    client.sendPointMove(150, 50, 2)
    context.step()
    expect(button.isTouched()).toBe(true)
    expect(button.isPushed()).toBe(false)

    client.sendPointMove(60, 60, 2)
    context.step()
    expect(button.isTouched()).toBe(true)
    expect(button.isPushed()).toBe(false)

    client.sendPointUp(60, 60, 2)
    context.step()
    expect(button.isTouched()).toBe(true)
    expect(button.isPushed()).toBe(false)
  })

  it('押下した座標からボタンが移動した際、非接触状態とする', () => {
    client.sendPointDown(50, 50, 1)
    context.step()
    expect(button.isTouched()).toBe(true)

    client.sendPointMove(150, 50, 1)
    context.step()
    expect(button.isTouched()).toBe(false)

    client.sendPointUp(150, 50, 1)
    context.step()
    expect(button.isTouched()).toBe(false)
    expect(button.isPushed()).toBe(false)
  })

  it('無効', () => {
    button.disable(true)
    expect(button.isDisabled()).toBe(true)
    client.sendPointDown(50, 50, 1)
    context.step()
    expect(button.isTouched()).toBe(false)
    client.sendPointMove(60, 60, 1)
    context.step()
    expect(button.isTouched()).toBe(false)
    client.sendPointDown(60, 60, 1)
    context.step()
    expect(button.isTouched()).toBe(false)
    expect(button.isPushed()).toBe(false)
  })
})
