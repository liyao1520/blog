/* eslint-disable @typescript-eslint/no-var-requires */
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
// webpack启用Gzip压缩
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
// const isPRD = process.env.NODE_ENV === "production";
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://49.232.192.248:8002",
        // target: "http://localhost:8989",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    // ...
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    externals: {
      marked: "marked",
      highlight: "hljs",
      vue: "Vue",
      "vue-router": "VueRouter",
      "chroma-js": "chroma",
    },
  },
};
