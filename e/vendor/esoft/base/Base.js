var util = require('util'); 
var fs = require('fs');
function Base(App){
    //路由对象
    this.router = {
        state: 0,
        data : [],
    };
    //控制器对象
    this.contorler = {
        state: 0,
        data : [],
    };

    //请求处理对象
    this.request = {
        state: 0,
        data : []
    };

    //初始化App
    this.initApp = function(){
        App.init();
    };

    //初始化配置文件
    this.initConfigures = function(callback){
        //console.log("初始化配置文件");
        var configures = require('./Configures');
        configures.init(App);
        
        callback(this.req,this.res,this.next);
    };

    //初始化路由
    this.initRouter = function(req){
        console.log("初始化路由");
        var router = require('./Router');
        router.init(this,req);
        
    };

    //初始化控制器
    this.initControler = function(){
        console.log("初始化控制器");
        //检测路由初始化状态，如果初始化失败测载入配置文件中的默认路由
        this.checkRouter();
        //控制器路径
        var controlDir  = App.param('controlDir');
        var controlPath = this.processControlerPath(controlDir,'Controler');
        // console.log(controlPath);
        //载入控制器
        if(!fs.existsSync(controlPath + '.js')) {
            return {
                error  : 1,
                status : '5060',
                message: "控制器:" + controlPath + '不存在',
            };
        }
        var control                    = require(controlPath);
        var Controler                  = require('./Controler');
            Controler.prototype.req    = this.req;
            Controler.prototype.res    = this.res;
            Controler.prototype.next   = this.next;
            Controler.prototype.router = this.router;
            Controler.prototype.app    = App;
        //继承Controler        
        util.inherits(control,Controler);
        //实例化用户定义的逻辑控制器
        var controler = new control(App);
        
        return controler;
    };

    //初始化控制器
    this.initRequest = function(){
        console.log("初始化请求处理对象");
        //检测路由初始化状态，如果初始化失败测载入配置文件中的默认路由
        this.checkRouter();
        //载入控制器
        var Request                = require('./Request');
        var Controler              = require('./Controler');
            Request.prototype.req  = this.req;
            Request.prototype.res  = this.res;
            Request.prototype.next = this.next;
            Request.prototype.app  = App;
        //继承        
        //util.inherits(Request,'');
        //实例化用户定义的逻辑控制器
        var request            = new Request();
            this.request.data  = request;
            this.request.state = 1;
    };

    //初始化服务类
    this.initService = function(){
        //if(App.service.state) return;
        console.log("初始化服务类");
        //检测路由初始化状态，如果初始化失败测载入配置文件中的默认路由
        this.checkRouter();
        //服务类路径,在/configs/params.js中配置
        var serviceDir  = App.param('serviceDir');
        var servicePath = this.processPath(serviceDir);
        //载入控制器
        var Service            = require('./Service');
            Service.req        = this.req;
            Service.res        = this.res;
            Service.next       = this.next;
            Service.app        = App;
            Service.serviceDir = servicePath;
            App.service        = Service;
            App.service.state  = 1;
    };

    //初始化模块
    this.initModel = function(){
        //if(App.model.state) return;
        console.log("初始化模块");
        //检测路由初始化状态，如果初始化失败测载入配置文件中的默认路由
        this.checkRouter();
        //模块类路径，在/configs/params.js中配置
        var modelDir        = App.param('modelDir');
        var modelPath       = this.processPath(modelDir);
        var Model           = require('./Model');
            App.router      = this.router;
            Model.req       = this.req;
            Model.res       = this.res;
            Model.next      = this.next;
            Model.app       = App;
            Model.modelDir  = modelPath;
            App.model       = Model;
            App.model.state = 1;
    };

    //初始化数据库连接服务
    this.initDBService = function(){
        //if(App.dBService.state) return;
        console.log("初始化数据库连接服务");
        var DBService     = require('./DBService');
        var DBServicePath = __dirname + '/DB';
        DBService.initDBService(App,DBServicePath);
        App.dBService = DBService;
    };

    //初始插件
    this.initPlug = function(){
        //if(App.plug.state) return;
        console.log("初始化插件类");
        //检测路由初始化状态，如果初始化失败测载入配置文件中的默认路由
        this.checkRouter();
        //插件路径,在/configs/params.js中配置，如果没有则加载系统rt
        var sysPlugDir = __dirname + '/../plug';
        var plugDir    = [sysPlugDir];
        var userPlug   = App.param('plugDir');
        if(userPlug) {
            var plugPath = this.processPath(userPlug);
            plugDir.push(plugPath);
        } 
        var Plug           = require('./Plug');
            Plug.req       = this.req;
            Plug.res       = this.res;
            Plug.next      = this.next;
            Plug.app       = App;
            Plug.plugDir   = plugDir;
            App.plug       = Plug;
            App.plug.state = 1;
    };

    //初始化助手服务
    this.initHelper = function(){
        console.log("初始化助手服务");
    };

    /**
     * 处理App模型路径
     */
    this.processPath = function(dirName){
        var path = "";
        switch(this.router.data.length){
            case 2: 
                path = App.root + dirName;
                break;
            case 3: 
                path = App.root +
                "/modules/" + this.router.data[0] + 
                dirName;
                break;
        };

        return path;
    };

    /**
     * 处理控制器路径
     */
    this.processControlerPath = function(dirName,typeName){
        var path = "";
        switch(this.router.data.length){
            case 2: 
                path = App.root + dirName +
                "/" + this.router.data[0] + typeName;
                break;
            case 3: 
                path = App.root + '/modules/' + this.router.data[0] +
                dirName +
                "/" + this.router.data[1] + typeName;
                break;
        };

        return path;
    };

    /**
     * 检测路由初始化状态，如果初始化失败测载入配置文件中的默认路由
     */
    this.checkRouter = function(){
        //检测路由初始化状态，如果初始化失败测载入配置文件中的默认路由
        if(!this.router.state){
            var defaultRouter    = App.configures.data.params.defaultRouter;
                this.router.data = [
                defaultRouter[0],
                defaultRouter[1]
            ];
            if(defaultRouter.length == 3) this.router.data.push(defaultRouter[2]);
            
            this.router.state = 1;
            //console.log("路由状态：",this.router);
        }
    };

}

module.exports = Base;