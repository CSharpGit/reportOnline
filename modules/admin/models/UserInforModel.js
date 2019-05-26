function UserInforModel() {
    //根据用户帐号查询用户信息：
    this.infors = function (data, callback) {
        //使用案例：实例化ShimService并调用成员方法查询
        var struct = {
            where: [],
            groupBy: [],
            orderBy: [],
            limit: []
        };

        //添加查询条件
        var acount = this.POST('!us_account', { reg: 'email', default: false });
        if (!acount) {
            callback({ error: 1, message: "登录帐号不能为空！" });
            return;
        }
        struct.where.push(" us_account = '" + acount + "'");

        var password = this.POST('!us_pasw', { default: false });
        if (!password) {
            callback({ error: 1, message: "登录密码不能为空！" });
            return;
        }

        //初始化构造查询对象
        var sqlStruct = this.SqlStruct(struct);

        //调用服务类进行查询
        var _acount = this.service('Account');

        _acount.querySysAcount(sqlStruct, function (error, results, fields) {
            var data = {
                error: 1,
                message: "帐号或者用户名错误"
            };
            if (error) {
                data = {
                    error: 2,
                    message: "登录失败"
                };
                callback(data);
                return;
            }
            data = (!error && (Object.keys(results).length === 0)) ?
                { error: 1, message: "不存在该账户！" } :
                { error: 0, data: results };
            callback(data);
            return;
        });
    }

    this.acountExists = function (params, callback) {
        //使用案例：实例化ShimService并调用成员方法查询
        var struct = {
            where: [],
            groupBy: [],
            orderBy: [],
            limit: []
        };

        //添加查询条件
        var acount = this.POST('!us_account', { reg: 'email', default: false });
        if (!acount) {
            callback({ error: 1, message: "登录帐号不能为空！" });
            return;
        }
        struct.where.push(" us_account = '" + acount + "'");
        //初始化构造查询对象
        var sqlStruct = this.SqlStruct(struct);
        //调用服务类进行查询
        var _acount = this.service('Account');
        _acount.querySysAcount(sqlStruct, function (error, results, fields) {
            results = results.length ? { error: 1, message: "当前Email已经注册过" } : { error: 0 }
            callback(results);
            return;
        });
    }

    /**
     * 写入用户注册信息
     */
    this.insertRegInfo = function (params, callback) {
        //返回的数据格式
        var data = {
            error: 1,
            message: "数据校验失败"
        };

        var acount = this.POST('!us_account', { default: false });
        if (acount === false) {
            data.message = "您没有填写帐号！";
            callback(data);
            return;
        }

        var userName = this.POST('us_name', { default: false });
        if (userName === false) {
            data.message = "您没有填写用户名！";
            callback(data);
            return;
        }

        var userPassword = this.POST('us_pasw', { default: false });
        if (userPassword === false) {
            data.message = "您没有填写密码！";
            callback(data);
            return;
        }

        //使用密码生成器生成密码
        var pwd = this.model('DataProcess').createPasswd(userPassword);
        var struct = [
            //待写入的第一组数据
            {
                us_name: userName,
                us_account: acount,
                us_pasw: pwd,
                us_addtime: 'now()'
            },
        ];

        //初始化构造查询对象
        var sqlStruct = this.SqlStruct(struct);

        var _acount = this.service('Account');

        _acount.addSysAcount(sqlStruct, function (error, results, fields) {
            data = error ?
                { error: 1, message: "数据写入失败！" } : { error: 0, message: '注册成功，正登录跳转...', uri: '/admin/sign/signin' };
            callback(data);
        });
    }

    /**
     * 清除用户登录信息
     */
    this.clear = function (callback) {
        var key = "U_" + this.sessionID();
        var session = this.session();
        delete session[key];
        var data = {
            error: 0,
            message: "成功退出登录！",
            uri: "/admin/sign/signin"
        };
        callback(data);
    }
}
module.exports = UserInforModel;