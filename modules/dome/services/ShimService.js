function ShimService(){
    //查询案例1：
    this.tables = function(callback){
        var sql = 'show tables ';
        this.DB().select(sql,function(error,results,fields){
            callback(results);
        });
    }

    //查询案例2：
    this.salgrade = function(sqlStruct,callback){
        var sql = 'select * from salgrade ' +
        sqlStruct.where() + 
        sqlStruct.groupBy() + 
        sqlStruct.orderBy() + 
        sqlStruct.limit();
        this.DB().select(sql,function(error,results,fields){
            callback(error,results,fields);
        });
    }

    //写入数据
    this.add = function(sqlStruct,callback){
        var st  = sqlStruct;
        var sql = 'insert into salgrade ' +
        st.insertNames() +
        st.insertValues();
        this.DB().insert(sql,function(error,results,fields){
            
            callback(error,results,fields);
        });
    }

    //更新数据
    this.update = function(sqlStruct,callback){
        var st  = sqlStruct;
        var sql = 'update salgrade set '+
        st.updateFeilds() + 
        st.where();

        console.log(sql);
        this.DB().update(sql,function(error,results,fields){

            callback(results);
        })
    }

    //删除数据
    this.delete = function(sqlStruct,callback){
        var st  = sqlStruct;
        var sql = 'delete from salgrade ' + st.where();

        console.log(sql);
        this.DB().delete(sql,function(error,results,fields){
            callback(results);
        });
    }
    
}

module.exports = ShimService;