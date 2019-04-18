require('./vendor/esoft/base/AddOnSysTemFunc');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var App = require('./vendor/esoft/base/App');

router.get('/*', request);
router.post('/*', request);
function request(req, res, next) {
    //如果资源存在，则不再作路由解析操作
    if (fs.existsSync(__dirname + '/../public' + req.originalUrl)) return;

    //载base对象
    var Base = require('./vendor/esoft/base/Base');
    Base.prototype.req = req;
    Base.prototype.res = res;
    Base.prototype.next = next;
    var base = new Base(App);

    //初始化App
    base.initApp();
    //初始化配置文件,和初始化数据库类型
    base.initConfigures(base.initDBService);
    //初始化路由
    base.initRouter(req);

    var ps0 = setInterval(function () {
        if (App.configures.state && App.dBService.state) {
            clearInterval(ps0);
            //初始化模块类
            base.initModel();
            //初始化服务类
            base.initService();
            //初始化插件类
            base.initPlug();
        }
    });

    var ps1 = setInterval(function () {
        if (App.model.state && App.service.state && App.plug.state) {
            clearInterval(ps1);
            //实例化控制器
            var controler = base.initControler(base);
            if (controler.error) {
                res.render('error', controler)
                return;
            }

            //执行操作前的操作
            controler.behavior(function (data) {
                if (data.error !== 0) {
                    if (data.uri) {
                        res.redirect(data.uri);
                        return;
                    }
                    res.send("验证错误:" + data.message);
                    return;
                }
                //执行操作
                App.run(base, controler, res);
            });
        }
    });
}


module.exports = router;