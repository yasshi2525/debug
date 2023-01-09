import * as moduleResourceManager from '../../../src/managers/resource'

export const prepare = () => {
  jest.spyOn(moduleResourceManager, 'image').mockImplementation((scene, path) =>
    client.createDummyImageAsset({
      id: 'dummy-image-asset-id',
      path,
      width: 100,
      height: 100
    })
  )
  jest.spyOn(moduleResourceManager, 'text').mockImplementation(() =>
    ({ data: '{}' } as g.TextAsset)
  )
}
