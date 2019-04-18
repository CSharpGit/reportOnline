function expControler(){
    this.useModel = function(){
        var data = {};

        //使用案例：实例化TestModel并调用showApp()方法
        this.model('Test').showApp();
    }

    this.useService = function(){
        //使用案例：实例化TestService并调用showApp()方法
        this.service('Test').showApp();
    }
        
    this.useMysql = function(){
        //使用案例：连接数据库并执行查询
        var sql = 'show tables';
        //this.DB()
        // this.DB().select(sql,function(error,results,fields){
        //     console.log(results)
        // });
    }

    /**
     * 列出所有数据表
     */
    this.tableShim = function(){
        var table = this.model('Table');
        var data  = {};
        //查询当前数据库中数据表的名称
        table.list(data,function(res){
            //console.log("this data putout by controller",res);
        });

        //向salgrade表写数据
        table.add(data,function(res){
            //console.log("this data putout by controller",res);
        });

        //更新表的数据
        table.update(function(res){
            //console.log("this data putout by controller",res);
        });

        //删除记录
        table.delete(function(res){
            //console.log("this data putout by controller",res);
        })

        this.render({});


    }

    this.useRequest = function(){
        //使用案例：访问Common.js中的request对象的属性
        //this.REQUEST('!dw',{default:96385274,reg:'!number'});
        //获取GET参数
        //this.GET();
        //获取POST参数
        //this.POST();
    }

    this.useNormalUpload = function(){
        /**
         * 使用案例：使用客户端图片异步上传插件（在视图文件中输出js异步上传代码）
         * 视图文件中的代码：
         *  <script src="/javascripts/lib/jquery-3.3.1.min.js"></script>
            <form id="testForm" action="/dome/index/file?a=b&c=d#sd" method="post" enctype="multipart/form-data">
                <input id="fileInput" type="file" name="image" size="50" />
                <br />
                <input type="submit" value="上传文件" />
            </form>
            <%- jqueryUpload %>
        */ 
        // data.normalAsync = this.plug('Uploads',{
        //     url:'/dome/index/file?a=b&c=d#sd',      //上传文件的服务端地址
        //     control:'#fileInput',                   //载入文件的input框id
        //     form:'#testForm',                       //承载input框的form元素的id
        //     successCallback:'',
        //     faileCallback:'',
        // }).normalAsync;
    }

    this.useJqueryCropperUpload = function(){
        /**
         * 使用案例：
         * 这是Jquery cropper插件上传文件的使用案例。
         * 插件具有其独有的视图组件和前端逻辑处理代码
         * cropperView输出的是 视图组件
         * cropperAsync输出的是 前端逻辑处理代码
         * 第三部分为辅助视图和辅助逻辑代码
         * 
         * 视图组件依赖cropper.min.css，ImgCropping.css，cropper.min.js 和 jquery.js.
         * jquery.js 在多数项目中已经被引入，这里不再将jquery.js作为输出视图所需要的参数定义
         * 
         */
        
        // 获取前端逻辑处理代码
        data.cropperView = this.plug('Uploads',{
            accept         : 'image/jpg,image/jpeg,image/png',     //在弹窗中可以选择的文件类型
            cropper_css    : '/stylesheets/lib/cropper.min.css',
            imgCropping_css: '/stylesheets/lib/ImgCropping.css',
            cropper_js     : '/javascripts/lib/cropper.min.js'
        }).cropperView;
        // 获取前端逻辑处理代码
        data.cropperAsync = this.plug('Uploads',{
            aspectRatio   : 1 / 1,           //默认比例
            viewMode      : 1,
            preview       : '.previewImg',   //预览视图
            guides        : true,            //裁剪框的虚线(九宫格)
            autoCropArea  : 0.8,             //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
            movable       : true,            //是否允许移动图片
            dragCrop      : true,            //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
            movable       : true,            //是否允许移动剪裁框
            resizable     : false,           //是否允许改变裁剪框的大小
            zoomable      : true,            //是否允许缩放图片大小
            mouseWheelZoom: true,            //是否允许通过鼠标滚轮来缩放图片
            touchDragZoom : true,            //是否允许通过触摸移动来缩放图片
            rotatable     : false,           //是否允许旋转图片
            responsive    : false,
            crop          : function(e) {
                console.log(e)// 输出结果数据裁剪图像。
            },
            url: '/dome/index/video',   //上传图片的服务地址
        }).cropperAsync;
        
        /*
        * 第三部分为辅助视图和辅助逻辑代码
        <input type="radio" name="type" value="0">宽图
        <input type="radio" name="type" value="1">高图<br/>

        <input id="replaceImg" type="button" name="file" value="选择图片">
        <!-- 输出视图组件 -->
        <%- cropperView %>
        <!-- 输出视逻辑代码 -->
        <%- cropperAsync %>
        <!-- 设置参数示例 -->
        <script>
            $('input[name=type]').change(function(){
                switch($(this).val()){
                    case '0': 
                        option.aspectRatio = 2 / 1;  //设置剪图比例
                        break;
                    case '1': 
                        option.aspectRatio = 1 / 2;
                        break;
                    default;
                }
            });
        </script>
        */
        
        data.title = "APP";

        /**
         * 渲染视图
         * 有三种调用方式：
         * this.render(data)   渲染默认视图(以views/为根目录，的模块名称/控制器名称/操作名称.html的文件）
         * this.render(data,'dome') 渲染(以views/为根目录，的模块名称/控制器名称/dome.html的文件）
         * this.render(data,'/dome') 渲染(以views/为根目录，的dome.html的文件）
         */
        this.render(data);
    };

    /**
     * 保存上传文件案例一：
     * 客户端action指向该操作，上传成功后返回json对象：
     * {"message":"File uploaded successfully","filename":"新建文本文档.txt","url":"files/新建文本文档.txt"}
     * 表示文件成功上传到项目目录下的files目录下
     */
    this.useSavefile = function(){
        this.upload({
            req    : this.req,
            res    : this.res,
            path   : 'files/',   //上传文件大分类名称
            typeDir: true        //需要分类管理文件（按日期分类）
        });
    }

     /**
     * 保存上传文件案例二：
     * 客户端action指向该操作，上传成功后返回json对象：
     * typeDir: false
     * {"message":"File uploaded successfully","filename":"新建文本文档.txt","url":"files/新建文本文档.txt"}
     * typeDir: true
     * {"message":"File uploaded successfully","filename":"www.wetouch.net.txt","url":"files/2018/10/6/www.wetouch.net.mp4"}
     * 表示文件成功上传到项目目录下的files目录下
     */
    this.login = function(){
        //使用案例：实例化TestService并调用showApp()方法
        var userInfo = this.service('sysAcount').showApp();
    }


}


module.exports = expControler;