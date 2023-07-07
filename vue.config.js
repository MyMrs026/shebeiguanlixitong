module.exports = {
  // devServer: {
  //   hotOnly: true, // 热更新
  //   proxy: {
  //     "/api": {
  //       // http://www.sirfang.com/build/ajax_get_list这是完整路径,将com/后的路径重写路径为api
  //       // 1 目标路径 这里相当于公共的地址
  //       target: "http://121.41.36.184:84/api",
  //       // port: 8080, // 1.1端口号 默认的可以不配
  //       open: true, // 1.2运行项目自启
  //       //2 允许跨域
  //       changOrigin: true,
  //       //3 重写路径
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //       //4 是否启用websockets
  //       // ws: true,
  //     }
  //   }
  // },
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
