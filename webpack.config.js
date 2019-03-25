const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'main.js': [
      path.resolve(__dirname, "src/index.js"),
      path.resolve(__dirname, "src/calendarOptionsMapper.js")
    ]
  }, 
  output: {
    filename: '[name]',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "examples/src/index.html"),
    //   filename: "./index.html"
    // }),
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  }
};