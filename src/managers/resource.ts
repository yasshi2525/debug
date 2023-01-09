export const image = (scene: g.Scene, path: string) => scene.asset.getImage(path)
export const text = (scene: g.Scene, path: string) => scene.asset.getText(path)

export const font = (scene: g.Scene, prefix: string) => new g.BitmapFont({
  src: image(scene, prefix + '.png'),
  glyphInfo: JSON.parse(text(scene, prefix + '.json').data)
})
