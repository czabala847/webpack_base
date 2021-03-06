const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpack = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.js",
  output: {
    clean: true,
    //en que directorio se encuentra nuestro proyecto
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    // clean: true,
    // filename: "main.js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  devtool: "source-map",
  //que va a trabajar
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@templates": path.resolve(__dirname, "./src/templates/"),
      "@styles": path.resolve(__dirname, "./src/styles/"),
      "@images": path.resolve(__dirname, "./src/assets/images/"),
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            // name: "[name].[ext]",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "./fonts/",
            esModule: false,
          },
        },
      },
    ],
  },

  plugins: [
    new htmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    new CopyWebpack({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin(),
  ],

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    port: 3006,
    open: true,
  },
};
