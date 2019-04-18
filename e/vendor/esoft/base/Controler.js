var util = require('util');
var fs     = require('fs');
var Common = require('./Common');

/**
 * 控制器
 * 该控制器被用户逻辑控制器继承
 */
function Controler() {}

//继承Common
util.inherits(Controler, Common);

Controler.prototype.test = function() {
    console.log("test方法");
}

/**
 * 请求执行操作前的操作
 * 该方法依次执行models/BehaviorModel中在ruler属性中描述的所有方法
 * 请取BehaviorModel对象有符合规则的操作名称，依次执行
 */
Controler.prototype.behavior = function(callback) {
    var data = {
        error  : 0,
        message: "请求执行前的操作成功",
    }

    var behavior = this.model("Behavior");
    if (Object.keys(behavior).length === 0) {
        callback(data);
        return;
    }

    //读取请求前执行的操作名称
    var ruler                    = [];
    var router                   = '/' + this.router.data.join('/');
    var queryStr                 = this.req.originalUrl;
    var index                    = queryStr.indexOf('?');
    if  (index !== false) router = router + queryStr.substr(index);

    for (var v in behavior.ruler) {
        if (v === '*') ruler = behavior.ruler[v];

        if ((v !== '*') && router.match(v)) ruler = ruler.concat(behavior.ruler[v]);
    }

    if (ruler.length === 0) {
        callback(data);
        return;
    }

    //操作执行状态。如果为success，则执行下一个操作；
    //为waite,则等待上一操作的执行结果
    //为faile,则当前操作的执行失败
    //为end,则所有操作的执行结束
    var state = 'success';
    var psb   = setInterval(function() {
        if (ruler.length > 0 && state === 'success') {
            //将状态设置为waite，让下一操作等待该操作执行完成
            var func   = ruler.shift();
            var params = {};
                state  = 'waite';
            if(!(func in behavior)){
                state = 'success';
                console.log("预执行操作不存在！");
                return false;
            }
            behavior[func](params, function(bres) {
                   data                       = bres;
                   state                      = (bres.error === 0) ? 'success' : 'faile';
                if (ruler.length === 0) state = 'end';
            });
        }

        if (state === 'end' || state === 'faile') {
            clearInterval(psb);
            callback(data);
        }
    });
}

/**
 * 如果view为假取默认路径，view为绝对路径取绝对路径，否则取相对路径
 */
Controler.prototype.renderLayer = function(data, view) {
    var path     = this.router.data.join('/');
    var layouter = "layouter/main";
        view     = view || '';
    if (view) {
        path = (view.indexOf('/') == -1) ?
            path.substr(0, path.lastIndexOf('/') + 1) + view: view.substr(1);
    }
    data.info     = "这是渲染的视图文件";
    data.viewPath = this.app.root + '/views/' + path + '.html';
    console.log("当前渲染的布局：", layouter);
    console.log("当前渲染的视图文件：", data.viewPath);
    this.res.render(layouter, data);

}

/**
 * 如果view为假取默认路径，view为绝对路径取绝对路径，否则取相对路径
 */
Controler.prototype.render = function(data, view) {
    var path = this.router.data.join('/');
        view = view || '';
    if (view) {
        path = (view.indexOf('/') == -1) ?
            path.substr(0, path.lastIndexOf('/') + 1) + view: view.substr(1);
    }
    data.info     = "这是渲染的视图文件";
    data.viewPath = this.app.root + '/views/' + path + '.html';
    console.log("当前渲染的视图文件：", data.viewPath);
    this.res.render(path, data);

}

/**
 * 
 */
Controler.prototype.renderJson = function(data) {
    var _data = (data && (typeof data === 'object')) ? data : {};
    if(data != _data){
        console.log({
            error  : 1,
            message: '调用 renderJson()方法时，传入的参数类型错误!',
            data   : data
        });
    }
    this.res.json(_data);
    return;
}

/**
 * 返回当前页面的操作权限
 */
Controler.prototype.authority = function(){
    return that.res.authority;
}




module.exports = Controler;