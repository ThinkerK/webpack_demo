const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',   //入口文件
    output: { 
        path: path.resolve(__dirname,'dist'), //打包后的文件路径
        filename: 'js/main.js'   //打包后的文件名称
    },
	// 开发环境 服务
	devServer:{
		port: 8080,
		publicPath: '/',
		historyApiFallback: {
		  rewrites: [
		    { from: /.*/, to: 'index.html' },
		  ],
		},
	},
	module: {
		rules: [
			//es6 语法转换;
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},{
				test: /\.(css|scss)$/,
				use: [{
						loader: "style-loader",
					},{
						loader: "css-loader",
						options: {
							sourceMap: true
						},
					},{
						loader: "sass-loader",
						options: {
							sourceMap: true
						},
					}],
			},{
			  test: /\.(png|jpe?g|gif|svg|cur)(\?.*)?$/,
			  loader: 'url-loader',
			  options: {
			    limit: 10000,
			    name: 'images/[name].[ext]',
			  }
			},
			
		]
	},
	plugins: [	
		// html 自动更改引用路径
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
	]
}