function TestService() {
    this.attr = "attr in model Test";
    this.showApp = function(data,callback){

        /**
         * 说明：Mysql类实例化为DBservice的一个属性。
         * 可以通过this.app.dBService.init(DBName)进行实例化。也可以在controler,model,service中调用Common的方法：this.DB()进行实例化。
         * Mysql类提供五个对外访问的方法:select(),insert(),update(),delect()及log();
         * 调用前四个方法，分别执行相应的操作。如果需要输出查询记录，调用log()方法即可（语法：this.DB().log().select(sql,callback)）。
         */
        //使用案例：连接数据库并执行查询
        var sql = 'show tables';
        this.DB().select(sql,function(error,results,fields){
            
            callback(results);
        });
    }
}

module.exports = TestService;