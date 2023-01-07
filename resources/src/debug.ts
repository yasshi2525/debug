import { listImages } from './utils/io'
import { Server } from './server';

(async () => {
  const server = new Server()
  const images = await listImages()
  await server.start({ images, port: 8081, open: true })
})()
