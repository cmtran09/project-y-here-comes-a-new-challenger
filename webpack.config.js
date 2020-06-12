const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './frontend/src/App.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve('./dist'),
		publicPath: '/'
		// publicPath: '/project-2-potterapi-pair/'
	},
	module: {
		rules: [
			{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.css$/, loader: ['style-loader', 'css-loader'] },
			{ test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
			{
				test: /\.(jpg|png|gif)/, use: [{
					loader: 'url-loader', options: { limit: 5000 }
				}]
			}
		]
	},
	devServer: {
		contentBase: path.resolve('src'),
		hot: true,
		open: true,
		port: 8009,
		watchContentBase: true,
		historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://localhost:5000/',
				secure: false
			}
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: 'frontend/src/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	]
}