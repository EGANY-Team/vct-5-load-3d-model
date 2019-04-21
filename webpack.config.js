const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const hwp = new HtmlWebpackPlugin({
  template: "src/index.html"
});

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.min.js"
  },
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, "build")
  },
  plugins: [hwp],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
