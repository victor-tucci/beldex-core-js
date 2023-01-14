"use strict"
//
const path = require('path')
//
module.exports = 
{
	devtool: "source-map",
	context: __dirname,
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "mymonero-core.js",
        library: "mymonero_core_js",
        libraryTarget: "umd"
	},
	cache: false,
	resolve: {
		alias: {
			"fs": "html5-fs"
		},
		extensions: ['.js', '.jsx', '.wasm', '.css', '.json', 'otf', 'ttf', 'eot', 'svg'],
		modules: [
			'node_modules'
		]
	},
	stats: {
		colors: true
	},
	module: {
		rules: [
			{
				test: /\.(otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{ loader: 'file-loader' }
				]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style!css!postcss' }
				]
			},
			{
				test: /\.styl$/,
				use: [
					{ loader: 'style!css!postcss!stylus?paths=node_modules' }
				]
			},
			{
				test: /\.js$/,
				exclude: {
					test: [
						path.join(__dirname, 'node_modules')
					],
					exclude: [
						'monero_utils/MyMoneroCoreCpp_ASMJS.asm.js',
						'monero_utils/MyMoneroCoreCpp_ASMJS.wasm'
					]
				},
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: false
							// ,
							// presets: [ "es2015" ],
							// plugins: ["transform-runtime"]
						}
					}
				]
			}
		]
	},
	externals: [
		(function () {
			var IGNORES = [
				'electron'
			];
			return function (context, request, callback) {
				if (IGNORES.indexOf(request) >= 0) {
					return callback(null, "require('" + request + "')");
				}
				return callback();
			};
		})()
	]
}