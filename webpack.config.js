const HtmlWebpackPlugin           = require('html-webpack-plugin')
const MiniCssExtractPlugin        = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin     = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin              = require('uglifyjs-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const TerserPlugin                = require('terser-webpack-plugin');

const isProduction = process.env.npm_lifecycle_event === 'build'

module.exports = {
  entry: './src',
  devtool: !isProduction && 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(jpe?g|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'base64-inline-loader?limit=1&name=[name].[ext]'
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        ecma: undefined,
        parse: {},
        compress: {},
        mangle: {
          safari10: true,
          properties: true
        },
        module: false,
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      },
    })],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: isProduction && {
        collapseWhitespace: true
      },
      inlineSource: isProduction && '\.(js|css|png)$'
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    new OptimizeCssAssetsPlugin({}),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    stats: 'minimal',
    overlay: true
  }
}
