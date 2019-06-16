function UserDbService(){
    /**
     * 初始化用户数据库信息
     */
    this.add = function(sqlStruct,callback){
        var st  = sqlStruct;
        var sql = 'insert into user_db ' +
        st.insertNames() +
        st.insertValues();
       
        this.DB().insert(sql,function(error,results,fields){
            callback(error,results,fields);
        });
    }

    /**
     * 获取用户数据库（源）信息
     */
    this.getDbInfo=function(sqlStruct,callback){
        var sql = 'select * from user_db' +
        sqlStruct.where() + 
        sqlStruct.groupBy() + 
        sqlStruct.orderBy() + 
        sqlStruct.limit();
        this.DB().select(sql,function(error,results,fields){
            if(!error){
                callback(results);
            }
        });
    }

    /**
     * 检查用户数据库是否可用
     */
    this.getTables=function(dbInfoStruct,callback) {
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: dbInfoStruct.db_host,
            user: dbInfoStruct.db_user,
            password: dbInfoStruct.db_pasw,
            database: dbInfoStruct.db_name
        });
        connection.connect();
        connection.query('show tables', function (error, results, fields) {
            callback(error, results, fields);
        });
    }

    /**
     * 删除用户数据源信息
     */
    this.dbDel = function(sqlStruct,callback){
        var st  = sqlStruct;
        var sql = 'delete from user_db ' + st.where();
        this.DB().delete(sql,function(error,results,fields){
            callback(error,results,fields);
        });
    }

    /**
     * 切换数据源信息
     */
    this.dbSwitch = function(sqlStruct,callback){
        var st  = sqlStruct;
        var sql = 'update user_db set ' + st.updateFeilds() + st.where();
        console.log("*******************sql语句：",sql);
        this.DB().update(sql,function(error,results,fields){
            callback(error,results,fields);
        });
    }
}

module.exports = UserDbService;