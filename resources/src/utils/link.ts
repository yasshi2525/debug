import { Application } from 'pixi.js'

export const createDownloadDiv = (app: Application, name: string) => {
  const div = document.createElement('div')
  const image = document.createElement('img')
  image.src = app.view.toDataURL()

  const a = document.createElement('a')
  a.append(image)
  a.href = app.view.toDataURL()
  a.download = `${name}.png`
  div.appendChild(a)
  return div
}

export const createDownloadGlyph = (glyph: Object, name: string) => {
  const a = document.createElement('a')
  a.text = 'glyph'
  a.download = `${name}.json`
  a.href =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(glyph))
  return a
}
