var util = require('util');

function Common(){}

Common.prototype.disc = function(){
    console.log("这是基于类的公共方法1");
}

/**
 * Sync模块的路径
 */
Common.prototype.sync = __dirname + '/Sync';


/**
 * 引用模块类初始化的方法（该方法用于业务调用）
 */
Common.prototype.model = function(modelNmae,data){
    return this.app.model.init(modelNmae,data);
}

Common.prototype.upload = function(obj){
    return this.app.model.upload(obj);
}

/**
 * 引用服务类初始化的方法（该方法用于业务调用）
 */
Common.prototype.service = function(serviceNmae,data){
    return this.app.service.init(serviceNmae,data);
}

/**
 * 引用插件类初始化的方法（该方法用于业务调用）
 */
Common.prototype.plug = function(plugNmae,data){
    return this.app.plug.init(plugNmae,data);
}

/**
 * 初始化一个数据库连接（该方法用于业务调用）,返回一个数据库连接对象
 */
Common.prototype.DB = function(DBName){
    return this.app.dBService.init(DBName);
}

/**
 * 初始化一个sql语句构造器（该方法用于业务调用）,返回一个sql语句构造对象
 */
Common.prototype.SqlStruct = function(struct){
    this.loadMysqlStruct();
    return this.mysqlStruct.init(struct);
}


/**
 * 获取post请求的参数（该方法用于业务调用）
 * param string 请求的参数名称
 * objExten Object 对请求的参数值进行处理的描述对象
 * 返回处理后的请求数据
 */
Common.prototype.POST = function(param,objExten){
    this.loadRequest();
    return this.request.POST(param,objExten);
}

/**
 * 获取get请求的参数（该方法用于业务调用）
 * param string 请求的参数名称
 * objExten Object 对请求的参数值进行处理的描述对象
 * 返回处理后的请求数据
 */
Common.prototype.GET = function(param,objExten){
    this.loadRequest();
    return this.request.GET(param,objExten);
}

/**
 * 获取get或post请求的参数（该方法用于业务调用）
 * param string 请求的参数名称
 * objExten Object 对请求的参数值进行处理的描述对象
 * 返回处理后的请求数据
 */
Common.prototype.REQUEST = function(param,objExten){
    this.loadRequest();
    return this.request.GET(param,objExten);
}

/**
 * 返回session（该方法用于业务调用）
 */
Common.prototype.session = function(){
    return this.req.session;
}



/**
 * 返回sessionID（该方法用于业务调用）
 */
Common.prototype.sessionID = function(){
    return this.req.sessionID;
}




/**
 * 载入客户端请求服务（该方法不用于业务调用）
 * 将实例化后的Request对象作为Common对象的原生属性
 */
Common.prototype.loadRequest = function(){
    var Request      = require('./Request');
    var request      = new Request(this.req);
        this.request = request;
}

/**
 * 载入sql构造模块（该方法不用于业务调用）
 * 将实例化后的SqlStruct对象作为Common对象的原生属性
 */
Common.prototype.loadMysqlStruct = function(){
    var MysqlStruce      = require('./DB/MysqlStruct');
    var mysqlStruct      = new MysqlStruce();
        this.mysqlStruct = mysqlStruct;
}






module.exports = Common;