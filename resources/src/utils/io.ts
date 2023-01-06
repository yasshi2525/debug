import fs from 'fs'

export const listImages = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir('images', (err, files) => {
      if (err) {
        reject(err)
      }
      resolve(files)
    })
  })
}
