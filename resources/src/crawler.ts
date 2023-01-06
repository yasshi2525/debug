import { Server } from './server'
import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path';

(async () => {
  const server = new Server()
  await server.start()

  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()
  await page.goto('http://localhost:8080/?download=1')
  await page.waitForSelector('a')

  const ls = await page.evaluate(() => {
    const list = [...document.querySelectorAll('a')]
    return list.map(a => ({ name: a.download, data: a.href }))
  })

  ls.forEach(data => {
    const basedir = path.resolve(__dirname, '..', '..')
    const dirname = data.name.substring(0, data.name.lastIndexOf('/'))
    fs.mkdirSync(path.resolve(basedir, dirname), { recursive: true })

    const extPosition = data.name.lastIndexOf('.')
    const filePath = data.name.substring(0, extPosition) +
      '_generated' + data.name.substring(extPosition)

    if (filePath.endsWith('.json')) {
      fs.writeFileSync(
        path.resolve(basedir, filePath),
        decodeURIComponent(data.data.replace(/^data:text\/json;charset=utf-8,/, ''))
      )
    } else {
      fs.writeFileSync(
        path.resolve(basedir, filePath),
        data.data.replace(/^data:image\/png;base64,/, ''),
        'base64'
      )
    }
  })
  await browser.close()
  await server.stop()
})()
