function UserDbModel() {
    /**
      * 写入用户注册信息
     */
    this.add = function (params, callback) {
        //返回的数据格式
        var data = {
            error: 1,
            message: "数据校验失败"
        };

        var userInfo=this.model('DataProcess').getUseInfo();
        var usid=userInfo[0].id;

        var dbLable = this.POST('!db_lable', { default: false });
        if (dbLable === false) {
            data.message = "为您的数据源命名吧！";
            callback(data);
            return;
        }

        var dbType = this.POST('db_type', { default: false });
        if (dbType === false) {
            data.message = "请选择您的数据库类型！";
            callback(data);
            return;
        }

        var dbName = this.POST('db_name', { default: false });
        if (dbName === false) {
            data.message = "请填写远程数据库名称！";
            callback(data);
            return;
        }

        var dbUser = this.POST('db_user', { default: false });
        if (dbUser === false) {
            data.message = "请填写远程数据库登录名！";
            callback(data);
            return;
        }

        var dbHost = this.POST('db_host', { default: false });
        if (dbHost === false) {
            data.message = "请填写远程数据库链接地址！";
            callback(data);
            return;
        }

        var dbPassWord = this.POST('db_pasw', { default: false });
        if (dbPassWord===false) {
            data.message = "请填写远程数据库登录密码！";
            callback(data);
            return;
        }

        //使用密码生成器生成密码
        var pwd = this.model('DataProcess').createPasswd(dbPassWord);
        var struct = [
            //待写入的第一组数据
            {
                usid:usid,
                db_lable: dbLable,
                db_type: dbType,
                db_name: dbName,
                db_user: dbUser,
                db_host: dbHost,
                db_pasw: pwd,
                db_addtime: 'now()'
            },
        ];
        console.log('&&&&&&&&&&&&&&&&&&&&&&&从表单接收数据：', struct);

        //初始化构造查询对象
        var sqlStruct = this.SqlStruct(struct);

        var _db = this.service('UserDB');

        _db.add(sqlStruct, function (error, results, fields) {
            data = error ?
                { error: 1, message: "数据写入失败！" } : { error: 0, message: '添加数据源成功，等待跳转...', uri: '/admin/home/dbset' };
            callback(data);
        });
    }
}
module.exports=UserDbModel;