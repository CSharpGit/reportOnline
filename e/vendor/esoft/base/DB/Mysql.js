/**
 * 说明：该类实例化为DBservice的一个属性。
 * 可以通过this.app.dBService.init(DBName)进行实例化。也可以在controler,model,service中调用Common的方法：this.DB()进行实例化。
 * 该类提供五个对外访问的方法:select(),insert(),update(),delect()及log();
 * 调用前四个方法，分别执行相应的操作。如果需要输出查询记录，调用log()方法即可（语法：this.DB().log().select(sql,callback)）。
 */
function Mysql(){
    this.configures = {};
    this.connection = {};
    this.results = {};
    this.withLog = 0;
    
    this.init = function(){
        var mysqlObj = new Mysql();
        var mysql = require('mysql');
        mysqlObj.connection = mysql.createConnection(this.configures.Mysql);
        mysqlObj.connection.connect();

        return mysqlObj;
    }

    this.log = function(){
        this.withLog = 1;
        return this;
    }

    this.putOutDone = function(){
        this.withLog = 0;
    }

    this.select = function(sql,callback){
        var that = this;
        this.connection.query(sql,function(error,results,fields){
            if(error) {
                console.log('[SELECT ERROR] -',error.message);
                return;
            }
            if(that.withLog) that.selectLog(results);
            
            callback(error,results,fields);
        });
    };

    this.selectLog = function(result){
        console.log('--------------------------SELECT----------------------------');
        console.log(result);        
        console.log('-----------------------------------------------------------------\n\n');
        this.putOutDone();
    }

    this.insert = function(sql,callback){
        var that = this;
        this.connection.query(sql,function(error,results,fields){
            if(error){
                console.log('[INSERT ERROR]-',error.message);
                return;
            }

            if(that.withLog) that.insertLog(results);

            callback(error,results,fields);
        })
    }

    this.insertLog = function(result){
        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:',result);        
        console.log('-----------------------------------------------------------------\n\n');
        this.putOutDone();
    }

    this.update = function(sql,callback){
        var that = this;
        this.connection.query(sql,function(error,results,fields){
            if(error){
                console.log('[UPDATE ERROR]-',erroe.message);
                return;
            }

            if(that.withLog) that.updateLog(results);

            callback(error,results,fields);
        })
    }

    this.updateLog = function(result){
        console.log('--------------------------DELETE----------------------------');
       console.log('UPDATE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
       this.putOutDone();
    }

    this.delete = function(sql,callback){
        var that = this;
        this.connection.query(sql,function(error,results,fields){
            if(error){
                console.log('[DELECE ERROR]-',error.message);
                return;
            }

            if(that.withLog) that.deleteLog(results);

            callback(error,results,fields);
        })
    }

    this.deleteLog = function(result){
        console.log('--------------------------DELETE----------------------------');
       console.log('DELETE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
       this.putOutDone();
    }
}

module.exports = Mysql;