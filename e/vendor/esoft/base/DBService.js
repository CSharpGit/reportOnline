var fs = require('fs');
var util = require('util');

var DBService = {
    app:{},
    data:[],
    DBConnect:[],
    /**
     * 实例化指定数据库连接，默认是mysql
     * @param {*} dBServiceName 
     */
    init: function(dBServiceName){
        dBServiceName = dBServiceName || 'Mysql';
        var DBConfigure = this.app.confs('database');
        if(this.app.helper.inArray(Object.keys(DBConfigure),dBServiceName) == -1){
            console.log('数据库' + dBServiceName + '配置项不存在');
            return;
        }
        dBServiceName = DBConfigure[dBServiceName].typeName ;
        
        //开启数据库连接对象在内存中共享
        if(this.app.helper.keyExists(this.DBConnect,dBServiceName)) {
            return this.DBConnect[dBServiceName];
        }
        console.log('正在创建',dBServiceName,'数据库连接');
        
        if(!this.app.helper.keyExists(this.data,dBServiceName)){
            console.log("您的数据库配置错误，可供使用的数据库模块有：",this.data)
            return;
        }
        var dBService = this.data[dBServiceName];
        eval(('var dBService = new ' + dBService + '()'));
        dBService.configures = this.app.confs('database');
        
        var DBConnect = dBService.init();
        this.DBConnect[dBServiceName] = DBConnect;
        return DBConnect;
    },

    /**
     * 初始化模块类
     * @param {*} App 
     * @param {*} dBServicePath 
     */
    initDBService: function(App,dBServicePath){
        if(App.dBService.state) return;
        this.app = App;
        var path = dBServicePath;
        //统计总的配置文件数量
        var len;
        fs.readdir(path,function(err, files){
            //如果模块目录为空，测停止加载并返回；
            if(!files) return;
            //统计模块类文件数量，是加载文件数量的指标
            len = files.length;
            //console.log('需要加载配置文件数量：',len);
            if (err) {
                return console.error(err);
            }
            
            files.forEach( function (file){
                //获取文件名作为对象名（文件名称与对象名称一至）
                var objName = file.split('.')[0];
                //console.log('FILENAME:',file);
                //跳过config对象中存在的同名的配置文件信息
                if(objName in DBService.data) {
                    len --;
                }else{
                    //读取配置到config对象
                    fs.stat(path + '/' +file,function(err, stats){
                        if(stats.isFile()){
                            //console.log("正在加载模块：",path + '/' + file);
                            DBService.data[objName] = require(path + '/' + file);
                            //将数据库配置添加到对象属性
                            //DBService.data[objName].prototype.configures = App.confs('database');
                            // console.log("正在读文件:");
                            len --;
                        }else{
                            len --;
                        }
                        
                    })
                }
            });
            
         });

         var psDBService = setInterval(function(){
            if(len === 0){
                clearInterval(psDBService);
                //console.log("配置文件初始化完成！");
                App.dBService.state = 1;
            }
         });
    }

}

module.exports = DBService;