function usdbControler(){
    /**
     * 初始化用户数据库信息
     */
    this.add=function(){
        var that = this;
        var data = {};
        var usDb = this.model('UserDb');
        usDb.dbEnable(data,function(res){
            if (res.error === 1) {//用户数据库无法访问，配置信息不正确
                that.renderJson(res);
                return;
            }
            usDb.insertDbInfor(data, function(res) {
                that.renderJson(res);
            });
        });
    }

    /**
     * 删除用户数据源
     */
    this.dbDel = function(){
        var that=this;
        var usDb = this.model('UserDb');
        usDb.dbDel({},function(res){
            that.renderJson(res);
        });
    }

    /*
     *修改数据源
     */
    this.dbSwitch = function() {
        var that = this;
        var usDb = this.model('UserDb');
        usDb.reInit({},function(res){
            if(!res.error){
                usDb.dbSwitch({}, function(res) {
                    that.renderJson(res);
                });
            }
        });
    }
}
module.exports=usdbControler;