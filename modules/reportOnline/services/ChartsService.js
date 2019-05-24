function ChartsService(){
    this.line=function(sqlStruct,callback){
        var sql = 'select chart_option from chart_basic' +
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
    this.getChartType=function(sqlStruct,callback){
        var sql = 'select chart_type from chart_basic' +
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
module.exports = ChartsService;