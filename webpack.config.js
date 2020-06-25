const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MODE = {
  DEV: "development",
  PROD: "production",
};

module.exports = ({ mode } = { mode: MODE.DEV }) => ({
  mode,
  resolve: { extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"] },
  entry: {
    renderer: "./index.tsx",
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        exclude: /node_modules/,
        test: /\.(tsx|ts)?$/,
      },
    ],
  },
  output: {
    path: path.join(__dirname, "./build/"),
    filename: "[name].js",
    publicPath: "./",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      chunks: ["renderer"],
    }),
  ],
});