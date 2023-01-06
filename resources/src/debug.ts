import { listImages } from './utils/io'
import { Server } from './server';

(async () => {
  const server = new Server()
  const list = await listImages()
  await server.start(8081, `?images=${list.join(',')}`)
})()
