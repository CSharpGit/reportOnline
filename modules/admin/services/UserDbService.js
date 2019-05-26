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
}

module.exports = UserDbService;