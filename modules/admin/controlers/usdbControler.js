function usdbControler(){
    /**
     * 初始化用户数据库信息
     */
    this.add=function(){
        var that = this;
        var data = {};
        var usDb = this.model('UserDb');
        usDb.add(data, function(res) {
            that.renderJson(res);
        });
    }
}
module.exports=usdbControler;