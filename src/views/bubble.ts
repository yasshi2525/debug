type BubbleOption = {} & Omit<g.FilledRectParameterObject, 'cssColor'> & Partial<{'cssColor': string}>

export class Bubble extends g.FilledRect {
  constructor (opts: BubbleOption) {
    super({
      cssColor: opts?.cssColor ?? '#d2b48c',
      touchable: true,
      ...opts
    })
    this.onPointDown.add(() => this.destroy())
  }
}
