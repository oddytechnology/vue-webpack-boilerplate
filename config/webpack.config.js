const path = require('path');
const glob = require('glob-all');

const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: ['./src/js/app.js', './src/scss/app.scss'],
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: (isDevelopment ? 'dist/js/app.js' : 'dist/js/app.[hash].js')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css|\.scss|.sass$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../../' } },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'sass-loader',
          { loader: 'postcss-loader', options: { config: { path: './config/' } } }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          { loader: 'url-loader', options: { limit: 5000 } },
          { loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'dist/fonts/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? 'dist/css/app.css' : 'dist/css/app.[hash].css',
      chunkFilename: isDevelopment ? 'dist/css/[id].css' : 'dist/css/[id].[hash].css'
    }),
    new CleanWebpackPlugin(),
    (isDevelopment ? false : new webpack.NoEmitOnErrorsPlugin()),
    (isDevelopment ? false : new webpack.optimize.ModuleConcatenationPlugin()),
    (isDevelopment ? false : new PurgecssPlugin({
      paths: glob.sync([
        path.resolve(path.resolve(), 'src/index.html'),
        path.resolve(path.resolve(), 'src/**/*.vue'),
        path.resolve(path.resolve(), 'src/**/*.js'),
      ]),
    })),
    (isDevelopment ? false : new HtmlCriticalPlugin({
      base: path.join(path.resolve(__dirname), '../public'),
      src: path.join(path.resolve(__dirname), '../public/index.html'),
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      hash: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      }
    })),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: './src/index.html',
      hash: isDevelopment,
    }),
  ].filter(Boolean),
  optimization: {
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ]
  }
}
