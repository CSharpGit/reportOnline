/**
 * 该模型专注于数据处理
 *  请将数据处理的代码写在该模型
 */
function DataProcessModel() {
    /**
     *  密码生成器
     */
    this.createPasswd = function (pw) {
        var utility = require('utility');
        var passwd = utility.md5(pw);
        return passwd;
    }

    /**
     * 记录用户登录状态
     * data 要求是对象
     * tag 是存为session的key前缀，用大写标识
     * 如果不写tag,默认是'U'(该前缀值对应的是用户登录成功时写入的用户基本信息),
     */
    this.setUserInfo = function (data, tag) {
        tag = tag || 'U';
        if (Object.keys(data).length > 0) {
            this.session()[tag + '_' + this.sessionID()] = JSON.stringify(data);
            return true;
        }
        return false;
    }


    /**
     * 返回用户登录状态
     * 如果没有找到当前访问都信息，则返回false
     * tag 是存为session的key前缀，用大写标识
     * 如果不写tag,默认是'U'(该前缀值对应的是用户登录成功时写入的用户基本信息),
     */
    this.getUseInfo = function (tag) {
        var sessinon = this.session()
        tag = tag || 'U';
        var str = sessinon[tag + '_' + this.sessionID()];
        if (str === undefined) return false;

        var info = ((typeof str === 'string') &&
            (str.indexOf('[') === 1 || str.indexOf('{'))) ?
            JSON.parse(str) :
            str;

        return info;
    }

    /**
     * 验证用户登录密码是否合法
     */
    this.loginValid = function (data) {
        var inputPass = this.createPasswd(this.POST('us_pasw'));//将输入密码进行加密
        if (inputPass === data[0].us_pasw) {//与数据库原密码对比
            //保存用户登录信息到session
            this.setUserInfo(data);
            return {
                error: 0,
                message: '登录成功，正在跳转...',
                uri: '/admin/home/index'
            }
        } else {
            return {
                error: 1,
                message: '密码错误！',
            }
        }
    }
}

module.exports = DataProcessModel;