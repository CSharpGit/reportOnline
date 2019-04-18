function TableModel() {
    this.attr = "attr in model Test";

    //查询案例2：
    this.list = function(data,callback){
        //使用案例：实例化ShimService并调用成员方法查询
        var struct = {
            where  : [],
            groupBy: [],
            orderBy: [],
            limit  : []
        };

        //添加查询条件
        if(this.GET('grade')) struct.where.push(" grade =" + this.REQUEST('grade')); 

        //初始化构造查询对象
        var sqlStruct = this.SqlStruct(struct);
        
        //调用服务类进行查询
        var shim = this.service('Shim');
        shim.salgrade(sqlStruct,function(res){
            if(res.length){

                shim.tables(function(res){
                    callback(res);
                });
            }
        });
        
    }

    /**
     * 向数据表写入新的记录
     */
    this.add = function(data,callback){
        var struct = [
            //待写入的第一组数据
            {
                grade: this.POST('grade',{default:10}),
                losal: this.GET('losal',{default:1500}),
                hisal: this.POST('hisal') || 2500,
            },
            //待写入的第二组数据
            {
                grade: this.POST('grade',{default:10}),
                losal: this.GET('losal',{default:1600}),
                hisal: this.POST('hisal') || 2600,
            }
        ];

        //初始化构造查询对象
        var sqlStruct = this.SqlStruct(struct);

        var shim = this.service('Shim');
        shim.add(sqlStruct,function(error,results,fields){

            callback(res);
        });
    }

    //更新数据
    this.update = function(callback){
        var struct = {
            feilds:{
                losal: 23,
                hisal: 'now()+23',
            },
            where:[
                'grade = 10',
            ]
         };

        //初始化构造查询对象
        var sqlStruct = this.SqlStruct(struct);

        var shim = this.service('Shim');
        shim.update(sqlStruct,function(error,results,fields){
            
            callback(res);
        })
    }

    //删除数据
    this.delete = function(callback){
        var struct= {
            where:[
                'grade = 10',
                //在这里写更多条件
            ]
        }

        var sqlStruct = this.SqlStruct(struct);
        var shim      = this.service('Shim');
        shim.delete(sqlStruct,function(error,results,fields){

            callback(res)
        })
    }

}

module.exports = TableModel;