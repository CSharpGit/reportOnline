function AccountService(){
    //查询账户信息
    this.querySysAcount = function(sqlStruct,callback){
        var sql = 'select * from us_info ' +
        sqlStruct.where() + 
        sqlStruct.groupBy() + 
        sqlStruct.orderBy() + 
        sqlStruct.limit();
        this.DB().select(sql,function(error,results,fields){
            callback(error,results,fields);
        });
    }

    /**
     * 添加系统用户帐号信息
     */
    this.addSysAcount = function(sqlStruct,callback){
        var st  = sqlStruct;
        var sql = 'insert into us_info ' +
        st.insertNames() +
        st.insertValues();
        this.DB().insert(sql,function(error,results,fields){
            callback(error,results,fields);
        });
    }
}

module.exports = AccountService;