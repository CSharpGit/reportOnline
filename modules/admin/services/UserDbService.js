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
}

module.exports = UserDbService;