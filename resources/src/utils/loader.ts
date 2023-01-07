
import { Texture } from 'pixi.js'

const parseImages = async (): Promise<string[]> => {
  const res = await fetch('/images')
  return await res.json()
}

export const loadImage = async () => {
  const list = await parseImages()
  const textures = list.map(filename =>
    Texture.fromURL(`images/${filename}`)
  )
  return await Promise.all(textures)
}
