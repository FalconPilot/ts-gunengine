const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: path.resolve(__dirname, 'src', 'front', 'index.tsx'),
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.front.json'
        }
      }],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.front.json' })]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist', 'front')
  }
}
