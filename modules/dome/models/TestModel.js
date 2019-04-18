function TestModel() {
    this.attr = "attr in model Test";
    this.showApp = function(data,callback){
        callback = callback;
        //使用案例：实例化TestService并调用showApp()方法
        var service = this.service('Test');
        service.showApp(data,function(res){
            
            callback(res);
        });
        
    }
}

module.exports = TestModel;