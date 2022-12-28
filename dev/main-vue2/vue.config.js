const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = {
  devServer: {
    hot: false,
    // disableHostCheck: true,
    port: 4000,
    open: true,
    // overlay: {
    //   warnings: false,
    //   errors: true,
    // },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {
    plugins:[
      new ModuleFederationPlugin({
        name:'main',
        shared:[
          'vue','vue-router'
        ],
        remotes:{
          childVue2:'childVue2@http://localhost:4001/micro-app/vue2/remoteEntry.js'
        }
      })
    ]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@micro-zoe/micro-app", path.join(__dirname, '../../lib/index.esm.js'))
    config.optimization.delete('splitChunks')      
  },
}
