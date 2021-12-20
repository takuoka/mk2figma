// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui/ui.ts', // The entry point for your UI code
    code: './src/code/main.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

      // // Enables including SCSS by doing "import './file.scss'" in your TypeScript code
      // {
      //   test: /\.(scss|css)$/,
      //   loader: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
      // },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      // {
      //   test: /\.(png|jpg|gif|webp|svg|zip)$/,
      //   loader: [{ loader: 'url-loader' }],
      // },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new webpack.DefinePlugin({
      global: {}, // Fix missing symbol error when running in developer VM
    }),
    new HtmlWebpackPlugin({
		cache: false,
		template: './src/ui/ui.html',
		filename: 'ui.html',
		inlineSource: '.(js)$',
		chunks: ['ui'],
    }),
    new HtmlInlineScriptPlugin(),
  ],
});