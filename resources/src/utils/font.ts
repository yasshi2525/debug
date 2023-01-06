import FontFaceObserver from 'fontfaceobserver'

export const loadFont = async () => {
  const font = new FontFaceObserver('mplus')
  await font.load()
}
