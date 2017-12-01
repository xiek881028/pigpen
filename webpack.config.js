'use strict';
const argv = require('yargs').argv;
const path = require('path');
const publicFn = require('./publicFn.js');
const config = require('./config.local.js');

const webpack = require('webpack');
const webpackBabelPlugin = require('babel-webpack-plugin');
const webpackEs3ifyPlugin = require('es3ify-webpack-plugin-v2');
const webpackExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackHtmlPlugin = require('html-webpack-plugin');

const shims = '<!--[if lt IE 9]><script type="text/javascript" src="./assets/html5shiv/html5shiv.min.js"></script><script type="text/javascript" src="./assets/respond.js/respond.min.js"></script><script type="text/javascript" src="./assets/es5-shim/es5-shim.min.js"></script><script type="text/javascript" src="./assets/es5-shim/es5-sham.min.js"></script><![endif]-->';

class WebpackConfig {
	constructor() {
		this.jsPath = path.resolve(__dirname, 'src/js');
		this.htmlPath = path.resolve(__dirname, 'src/html');
		this.jsTree = publicFn.fileTree(this.jsPath);
		this.pageTree = publicFn.fileTree(this.htmlPath);
		this.prod = argv.optimizeMinimize;
		this.min = this.prod ? '.min' : '';
		return this.init();
	}

	init() {
		return {
			entry: this.entry(),
			output: this.output(),
			module: this.module(),
			resolve: this.resolve(),
			externals: this.externals(),
			plugins: this.plugins(),
		};
	}

	entry() {
		let _entry = {};
		this.jsTree.map((item)=>{
			let _parse = path.parse(path.relative(this.jsPath, item));
			_entry[path.join(_parse.dir, `./${_parse.name}`)] = item;
		});
		return _entry;
	}

	output() {
		return {
			path: path.resolve(__dirname, 'dist/js'),
			filename: `[name]${this.min}.js`,
		};
	}

	module() {
		return {
			rules: [
				{
					test: /\.pug$/,
					use: ['pug-loader'],
				},
				{
					test: /\.scss$/,
					use: webpackExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							'css-loader?sourceMap',
							//不需要CSS Sprite功能 解开下面注释 同时注释'postcss-loader?sourceMap'
							// {
							// 	loader: 'postcss-loader',
							// 	options: {
							// 		plugins: [
							// 			require('autoprefixer')(),
							// 		],
							// 		sourceMap: true,
							// 	},
							// },
							'postcss-loader?sourceMap',
							'sass-loader?sourceMap',
						],
					}),
				},
				{
					test: /\.js$/,
					use: ['babel-loader'],
					exclude: /node_modules/,
				},
				{
					test: /\.(gif|jpe?g|png)(\?.*)?$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 8192,
								name: '../images/[name].[ext]',
							},
						},
					],
				},
				{
					test: /\.(ttc|ttf|woff)(\?.*)?$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 8192,
								name: '../font/[name].[ext]',
							},
						},
					],
				},
			],
		};
	}

	resolve() {
		return {};
	}

	externals() {
		return {
			jquery: '$',
			json3: 'JSON3',
		};
	}

	plugins() {
		let plugins = [
			new webpack.DefinePlugin({'process.env': {NODE_ENV: `'${this.env}'`}}),
			new webpackExtractTextPlugin(path.join('../css', `[name]${this.min}.css`)),
			new webpackBabelPlugin(),
			new webpackEs3ifyPlugin(),
		];

		if(this.prod) {
			plugins.push(new webpack.optimize.CommonsChunkPlugin({name: 'common', minChunks: 2}));
			plugins.push(new webpack.optimize.UglifyJsPlugin({
				comments: false,
				compress: {
					properties: false,
					warnings: false,
				},
				sourceMap: true,
			}));
		}

		this.pageTree.forEach((page) => {
			let _pages = path.parse(path.relative(this.htmlPath, page));
			let pageName = path.parse(page).name;
			for(let i=0,max=config.pageignore.length; i<max; i++){
				if(pageName == config.pageignore[i])return;
			}
			plugins.push(new webpackHtmlPlugin({
				title: {
					min: this.min,
					shims,
				},
				template: path.resolve(page),
				filename: path.resolve(__dirname, 'dist', `${path.join(_pages.dir, `./${_pages.name}`)}.html`),
				inject: false,
			}));
		});

		return plugins;
	}
}

module.exports = () => {
	return new WebpackConfig();
};
