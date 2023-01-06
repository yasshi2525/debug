import { Container } from 'pixi.js'

export type ImageSet = {
  name: string,
  data: Container,
  width: number,
  height: number,
  size: number | { width: number; height: number }
  glyph?: Object;
}
