var params = {
    server : {
        port: '8080',
        ip  : '127.0.0.1'
    },
    //默认路由
    defaultRouter: ['admin','index','index'],
    //控制器目录
    controlDir: '/controlers',
    //服务类目录
    serviceDir: '/services',
    //模型类目录
    modelDir: '/models',

    //资源目录(上传图片，音乐，视频等文件的根目录)
    sourceDir: '/public',
}

exports.params = params;