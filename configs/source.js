//配置静态资源文件名后缀
var source = {
    html:{
        err404:'e:/NODEJS/syudyOption/app/views',
        errPause:"e:/NODEJS/syudyOption/app/views"
    },
    static:{
        extension:['js','css','png'],
        path:'e:/NODEJS/syudyOption/app/public',
    },
    download:{
        extension:['rar','mv','mp4'],
        path:'e:/NODEJS/syudyOption/app/public/down',
    }
    
}
    


exports.source = source;