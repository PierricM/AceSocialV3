const webpack = require('webpack');
const { defineConfig } = require('@vue/cli-service')


module.exports = {
devServer: {
    allowedHosts: "all",
  },
  transpileDependencies: true,
  configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer']
            })
        ],
        resolve: {
            fallback: {
                crypto: false,
                fs: false,
                assert: false,
                process: false,
                util: false,
                path: false,
            }
        }
    },
  publicPath: process.env.NODE_ENV === 'production'
      ? '/AceSocialV3/'
      : '/'
  }

// const webpack = require('webpack');
// const { defineConfig } = require('@vue/cli-service')

// module.exports = defineConfig({
//     transpileDependencies: true,
//     configureWebpack: {
//         plugins: [
//             new webpack.ProvidePlugin({
//                 Buffer: ['buffer', 'Buffer']
//             })
//         ],
//         resolve: {
//             fallback: {
//                 crypto: false,
//                 fs: false,
//                 assert: false,
//                 process: false,
//                 util: false,
//                 path: false,
//             }
//         }
//     }
// })