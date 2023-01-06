
import { Texture } from 'pixi.js'

const parseImages = () =>
  new URL(window.location.href).searchParams.get('images')?.split(',') ?? []

export const loadImage = async () => {
  const list = parseImages()
  const textures = list.map(filename =>
    Texture.fromURL(`images/${filename}`)
  )
  return await Promise.all(textures)
}
