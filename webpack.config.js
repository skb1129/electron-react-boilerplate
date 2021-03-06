const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const { development = false } = env;
  return {
    mode: development ? "development" : "production",
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
    target: development ? "electron-renderer" : "electron-preload",
    module: {
      rules: [
        {
          loader: "babel-loader",
          exclude: /node_modules/,
          test: /\.(tsx|ts|jsx|js)?$/,
        },
        {
          test: /\.(scss|css)?$/,
          use: [
            development ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: "[name]__[local]__[contenthash:base64:5]",
                  exportLocalsConvention: "camelCaseOnly",
                },
              },
            },
            "sass-loader",
          ],
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
        title: "ElectronReact",
        filename: "index.html",
        template: development ? "public/development.html" : "public/production.html",
        chunks: development ? ["renderer"] : [],
        xhtml: true,
        inject: false,
      }),
      new MiniCssExtractPlugin({ filename: "styles.css" }),
      new CopyPlugin({ patterns: [{ from: "*.png", context: "public" }] }),
      new EnvironmentPlugin({ HMR: development }),
    ],
  };
};
