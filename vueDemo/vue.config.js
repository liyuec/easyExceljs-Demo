module.exports = {
  lintOnSave: false,

  devServer: {
    hot:false,
    compress:false,
    disableHostCheck: true,
    port: 8081,
    proxy: {
      '/oe': {
        //target: 'http://10.157.109.42:9691',
        //target: 'http://10.157.109.42:8686/oe/',
        target: 'http://10.157.109.42:8686',
        //uat环境
        //http://10.157.107.18/oe/backend/common/user/resource 
        //target: 'http://localhost:6666',
        changeOrigin: true,
        pathRewrite: {
          '^/oe/backend': '/oe'
          // '^/charge': '/charge',

        }
      },
    }
  },
 /*  transpileDependencies: [
    'sockjs-client'
  ], */
  /* transpileDependencies: [
    '*'
  ], */
  configureWebpack:{
    devtool: 'source-map'
  },
  publicPath: './',
}