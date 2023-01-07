import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from '../webpack.config'

type ServerStartOption = {
  images: string[],
  port?: number
  open?: boolean
}

export class Server {
  private server: WebpackDevServer

  async start (opts: ServerStartOption) {
    this.server = new WebpackDevServer({
      ...config.devServer,
      open: opts.open ?? false,
      port: opts.port ?? 8080,
      setupMiddlewares: (middlewares, devServer) => {
        devServer.app.get('/images', (_, res) => {
          res.send(opts.images)
        })
        return middlewares
      }
    }, Webpack(config))
    console.log('starting server...')
    await this.server.start()
  }

  async stop () {
    console.log('stopping server...')
    await this.server.stop()
  }
}
