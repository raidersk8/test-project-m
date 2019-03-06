// Webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.scss$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },

      {
        test: /\.css$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },

	{
	  // Match woff2 in addition to patterns like .woff?v=1.1.1.
	  test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
	  use: {
		loader: "url-loader",
		options: {
		  // Limit at 50k. Above that it emits separate files
		  limit: 50000,

		  // url-loader sets mimetype if it's passed.
		  // Without this it derives it from the file extension
		  mimetype: "application/font-woff",

		  // Output below fonts directory
		  name: "./fonts/[name].[ext]",
		}
	  },
	},
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
		use: [
				{
					loader: 'file-loader',
					options: {
						outputPath: 'fonts',
						name: '[name].[ext]',
					},
				},
		  ],
      },

	  {
		  test: /\.(gif|png|jpe?g)$/i,
		  use: [
				{
					loader: 'file-loader',
					options: {
						outputPath: 'images',
						name: '[name].[ext]',
					},
				},
		  ],
		}
    ]
  },
	optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [ 
    new CleanWebpackPlugin('dist', {
	cleanAfterEveryBuildPatterns: ['images/*']
} ),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
  ]
};