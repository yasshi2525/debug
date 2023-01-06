import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from '../webpack.config'

export class Server {
  private server: WebpackDevServer

  async start (open = false) {
    this.server = new WebpackDevServer({ ...config.devServer, open }, Webpack(config))
    console.log('starting server...')
    await this.server.start()
  }

  async stop () {
    console.log('stopping server...')
    await this.server.stop()
  }
}
