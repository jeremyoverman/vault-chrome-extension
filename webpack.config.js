const path = require('path');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    background: './src/background/background.ts',
    content_script: './src/content_script.tsx',
    popup: './src/popup/popup.tsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist/js")
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class',
      'react-dom-factories': 'preact-compat/lib/react-dom-factories'
    }
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loaders: ['awesome-ts-loader']
    }, {
      test: /\.(scss|sass)$/,
      use: [
        'style-loader',
        'css-loader',
        'resolve-url-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            sourceMapContents: false
          }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
    {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
    {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
    {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
    ]
  },
  plugins: [
    new ChromeExtensionReloader({
      entries: {
        background: 'background',
        reloadPage: true
      }
    })
  ]
};