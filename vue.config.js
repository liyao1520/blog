/* eslint-disable @typescript-eslint/no-var-requires */
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
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
