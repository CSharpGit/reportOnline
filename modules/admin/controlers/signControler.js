function signControler(){
    
    /**
     * 用户注册
     */
    this.signup = function() {
        this.render({});
    }
    
    /**
     * 写入注册信息
     */
    this.regist = function() {
        var that = this;
        var data = {};
        var state = 0;
        var userInfor = this.model('UserInfor');
        userInfor.acountExists({}, function(res) {
            if (res.error === 1) {//账户存在，发送账户已注册信息
                that.renderJson(res);
                return;
            }
            userInfor.insertRegInfo({}, function(res) {
                that.renderJson(res);
            });
        });
        
    }
    
    /**
     * 用户登录
     */
    this.signin = function() {
        this.render({});
    }

    /**
     * 用户登录验证
     */
    this.valid = function() {
        //查询用户信息
        var that = this;
        var dataProcess = this.model("DataProcess");

        this.model('UserInfor').infors({}, function(res) {
            if (res.error) {//如果出错，返回错误信息
                that.renderJson(res);//传给renderJson的一定是json对象
                return;
            }
            res = dataProcess.loginValid(res.data);//账户存在条件下，拿到该账户的信息进行登录认证
            that.renderJson(res);
            return;
        });
    }

    /**
     * 退出登录
     */
    this.exit = function() {
        var  that = this;
        this.model("UserInfor").clear(function(res) {
            if (!res.error){
                // that.renderJson(res);
                that.render({},'signin')
                return;
            }
            that.renderJson({error:1,message:'系统错误，没有成功退出！'});
        });
    }
}
module.exports = signControler;