const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env = { development: false }) => ({
  mode: env.development ? "development" : "production",
  devServer: {
    host: "0.0.0.0",
    port: "3000",
    proxy: {
      "**": {
        bypass(req) {
          if (req.headers.accept.includes("html")) {
            return "/index.html";
          }
        },
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    overlay: true,
    historyApiFallback: true,
  },
  resolve: { extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"] },
  entry: {
    renderer: "./index.tsx",
  },
  target: env.development ? "electron-renderer" : "electron-preload",
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
