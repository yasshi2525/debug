import { Configuration } from 'webpack'
import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const config: Configuration = {
  mode: 'development',
  entry: ['./src/index.ts'],
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      { test: /\.ts/, use: 'ts-loader' }
    ]
  },
  resolve: { extensions: ['.js', '.ts'] },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'html/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'images', to: 'images' },
        { from: 'fonts', to: 'fonts' },
        { from: 'css', to: 'css' }
      ]
    })
  ]
}

export default config
