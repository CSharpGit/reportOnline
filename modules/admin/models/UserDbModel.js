function UserDbModel() {
    /**
      * 写入用户注册信息
     */
    this.insertDbInfor = function (params, callback) {
        //返回的数据格式
        var data = {
            error: 1,
            message: "数据校验失败"
        };

        var userInfo = this.model('DataProcess').getUseInfo();
        var usid = userInfo[0].id;
        var dbLable = this.POST('!db_lable', { default: false });
        var dbType = this.POST('db_type', { default: false });
        var dbName = this.POST('db_name', { default: false });
        var dbUser = this.POST('db_user', { default: false });
        var dbHost = this.POST('db_host', { default: false });
        var dbPassWord = this.POST('!db_pasw', { default: false });

        var dbInfo = [
            {
                usid: usid,
                db_lable: dbLable,
                db_type: dbType,
                db_name: dbName,
                db_user: dbUser,
                db_host: dbHost,
                db_pasw: dbPassWord,
                db_addtime: 'now()'
            },
        ];
        var checkResults = checkFormPost(dbInfo[0]);
        if (!checkResults.next) {
            data.message = checkResults.message;
            callback(data);
            return;
        }

        //初始化构造查询对象
        var sqlStruct = this.SqlStruct(dbInfo);
        var usDb = this.service('UserDb');
        usDb.add(sqlStruct, function (error, results, fields) {
            data = error ?
                { error: 1, message: "数据写入失败！" } : { error: 0, message: '添加数据源成功，等待跳转...', uri: '/admin/home/dbset' };
            callback(data);
        });
    }

    /**
     * 获取用户数据库（源）信息
     */
    this.getDbInfo = function (params, callback) {
        var userInfo = this.model("DataProcess").getUseInfo();
        var usid = userInfo[0].id;
        var struct = {
            where: [],
            groupBy: [],
            orderBy: [],
            limit: []
        };

        // 添加查询条件
        struct.where.push(" usid='" + usid + "'");

        //初始化构造查询对象
        var sqlStruct = this.SqlStruct(struct);

        //调用服务类进行查询
        var usDb = this.service('UserDb');
        usDb.getDbInfo(sqlStruct, function (res) {
            var resData = {
                dbUsing: [],
                dbUsed: []
            };
            if (res.length) {
                res.forEach(e => {
                    if (e.db_use == '0') {
                        resData.dbUsed.push(e);
                    } else {
                        resData.dbUsing.push(e);
                    }
                });
                callback(resData);
            }
        });
    }

    /**
     * 检查表单填写情况
     */
    function checkFormPost(formData) {
        var results = {
            key: '',
            message: '',
            next: true
        }
        for (var e in formData) {
            results.key = e;
            if (formData[e] === false) {
                results.message = "表单中不存在“name=" + e + "”的元素";
                results.next = false;
                break;
            }
            if (formData[e] === '') {
                results.message = "请检查必填项是否全部填写完成！";
                results.next = false;
                break;
            }
        }
        return results;
    }

    /**
     * 检查用户数据库是否可用
     */
    this.dbEnable = function (params, callback) {
        //返回的数据格式
        var data = {
            error: 1,
            message: "数据校验失败"
        };
        var dbName = this.POST('db_name', { default: false });
        var dbUser = this.POST('db_user', { default: false });
        var dbHost = this.POST('db_host', { default: false });
        var dbPassWord = this.POST('!db_pasw', { default: false });

        var dbInfo={
            db_name: dbName,
            db_user: dbUser,
            db_host: dbHost,
            db_pasw: dbPassWord
        };
        var checkResults = checkFormPost(dbInfo);
        if (!checkResults.next) {
            data.message = checkResults.message;
            callback(data);
            return;
        }
        var usDb = this.service('UserDb');
        usDb.getTables(dbInfo, function (error, results, fields) {
            results = error ? { error: 1, message: "数据库初始化错误，请检查数据库相关信息!" } : { error: 0 };
            callback(results);
        });
    }
}
module.exports = UserDbModel;