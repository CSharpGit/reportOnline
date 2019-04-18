function BehaviorModel() {
    /**
     * 定义执行请求操作前执行的操作名称
     * 规则：
        {
            '*'              : ['func1',func2','...'],   //所有路由的请求，都在执行请求的操作前执行数组中的方法组
            '/dome/site/home': ['func1',func2','...'],   //指定符合该路由的请求时，在执行请求的操作前执行数组中的方法组
        }
     */
    this.ruler = {
        //'*'              : ['func1','func2'],     //所有路由的请求，都在执行请求的操作前执行数组中的方法组
        //'/dome/site/home': ['showApp','func9'],   //指定符合该路由的请求时，在执行请求的操作前执行数组中的方法组
    }


    /**
     * 成员方法的定义要求：
     * 回调函数的参数是一个对象，这个对象包含了该方法执行的姿态信息。
     * 如果操作执行失败，则对象如：
        {
            error  : 1,
            message: "执行失败的描述",
        }
        如果操作执行成功，则对象如：
        {
            error  : 0,
            message: "执行成功的描述(通常不需要)",
        }
     */
    /**
     * 测试调用是否成功
     */
    this.func1 = function(data,callback){
        console.log("测试调用是否成功1");
        callback({
            error  : 0,
            message: '数据校验错误',
        });
    }

    /**
     * 测试调用是否成功
     */
    this.func2 = function(data,callback){
        console.log("测试调用是否成功2");
        setTimeout(function(){
            callback({
                error: 0,
            });
        },2);
    }
    /**
     * 测试调用是否成功
     */
    this.func9 = function(data,callback){
        console.log("测试调用是否成功9");
        callback({
            error: 0,
        });
    }
    /**
     * 测试调用是否成功
     */
    this.func10 = function(data,callback){
        console.log("测试调用是否成功10");
        callback({
            error: 0,
        });
    }

    

    /**
     * 使用案例：实例化TestService并调用showApp()方法
     */
    this.showApp = function(data,callback){
        callback = callback;
        //使用案例：实例化TestService并调用showApp()方法
        var service = this.service('Test');
        service.showApp(data,function(res){
            console.log(res);
            callback({
                error: 0,
            });
        });
        
    }
}

module.exports = BehaviorModel;