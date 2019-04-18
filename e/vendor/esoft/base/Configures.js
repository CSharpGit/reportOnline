var fs = require('fs');

var Configures = {
    readFiles: '读取配置文件',
    configPath:'',

    init: function(App){
        //初始化配置文件目录
        this.initPath(App)
        //初始化配置文件
        this.initConfigures(App);
    },
    
    initPath: function(App){
        if(!App.configures.state){
            this.configPath = App.root + '/' + App.configures.dir;
            App.helper.mkdir(this.configPath);
        }
    },

    initConfigures: function(App){
        if(App.configures.state) return;
        App.configures.data = [];
        //配置文件路径
        var path = this.configPath;
        //统计总的配置文件数量
        var len;

        fs.readdir(path,function(err, files){
            len = files.length;
            //console.log('需要加载配置文件数量：',len);
            if (err) {
                return console.error(err);
            }
            
            files.forEach( function (file){
                //获取文件名作为对象名（文件名称与对象名称一至）
                var objName = file.split('.')[0];
                //console.log('FILENAME:',file);
                //跳过config对象中存在的同名的配置文件信息
                if(objName in App.configures.data) {
                    end();
                }else{
                    //读取配置到config对象
                    fs.stat(path + '/' +file,function(err, stats){
                        if(stats.isFile()){
                            //console.log("正在加载配置文件：",path + '/' + file);
                            App.configures.data[objName] = require(path + '/' + file)[objName];
                        }
                        end();
                    })
                }
            });
        });

        function end(){
            len--;
            if(len === 0){
                console.log("配置文件初始化完成！");
                App.configures.state = 1;
            }
        }
    }
}

module.exports = Configures;