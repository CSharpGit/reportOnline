var App = {
    root: "",
    configures:{
        discript:'配置文件，在系统运行前需要加载完成。',
        dir: 'configs',  //配置文件存放目录。在项目中默认与e框架在同一层   
        state:0,
    },

    model:{
        discript:'模块类，在配置文件加载完成后加载。',
        state:0,
    },

    service:{
        discript:'服务类，在配置文件加载完成后加载。',
        state:0,
    },

    dBService:{
        discript:'数据库连接类，在配置文件加载完成后加载。',
        state:0,
    },

    plug:{
        discript:'插件初始化类，在配置文件加载完成后加载。',
        state:0,
    },

    //状态码
    state:{
        error:1,
        //status:'5050',  //访问的模型不存在status:
        //status:'5060',  //访问的控制器不存在
        //status:'5070',  //请求的操作不存在
    },

    //初始化App
    init: function(){
        var dirname = __dirname.replace(/\\/g,'/');
        //初始化应用目录
        this.root = dirname.substr(0,dirname.indexOf('/e/'));
        //初始化Helper类
        this.helper = require('./Helper');
    },

    /**
     * 返回系统参数值
     * 系统参数值在/configs/params.js中设置
     * @param {*} paramName 参数名称
     */
    param: function(paramName){
        return (paramName in this.configures.data['params']) ? 
        this.configures.data['params'][paramName] :
        null;
    },

    /**
     * 返回系统配置
     * 系统配置在/configs/中设置
     * @param {*} paramName 参数名称
     */
    confs: function(paramName){
        return this.configures.data[paramName];
    },

    /**
     * 运行app
     * @param {*} base 
     * @param {*} controler 
     * @param {*} res 
     */
    run: function(base,controler,res){
        var actionIndex = base.router.data.length - 1;
        var action = base.router.data[actionIndex];
        if(! (action in controler)){
            this.state.message = '找不到您需要的操作！';
            this.state.status = '5070';
            res.render('error',this.state);
            return;
        }
        controler[action]();
    }
}

module.exports = App;