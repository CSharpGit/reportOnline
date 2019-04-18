var fs = require('fs');
var util   = require('util');
var multer = require('multer');

var Model = {
    data    : [],
    modelDir: '',

    /**
     * 实例化指定模块
     * @param {*} modelName 
     */
    init: function(modelName,data){
        //if(modelName in this.data) return this.data[modelName];
        
        try{
            var loadModel                = require(this.modelDir + '/' + modelName + "Model");
            var common                   = require('./Common');
                loadModel.prototype.req  = this.req;
                loadModel.prototype.res  = this.res;
                loadModel.prototype.next = this.next;
                loadModel.prototype.app  = this.app;
            util.inherits(loadModel,common);
            var       model      = new loadModel();
            this.data[modelName] = model;
        }catch(err){
            console.log(err.Error);
        }

        return model || new Object();
    },

    //上传文件
    upload: function(obj){
        console.log('上传的文件信息:',obj.req.files);  // 上传的文件信息
        var typeDir = "";
        if(obj.typeDir){
            var d       = new Date();
            var Y       = d.getFullYear();
            var M       = d.getMonth() + 1;
            var D       = d.getDate();
                typeDir = Y + '/' + M + '/' + D + '/';
        }
        var filePath    = this.app.root + this.app.param('sourceDir') + '/' + obj.path + typeDir;
        var MimeType    = require('../lib/MimeType');
        var fileName    = obj.req.files[0].filename;
        var mimeType    = obj.req.files[0].mimetype;
        var contentType = MimeType.getContentType(mimeType);
        var des_file    = filePath + fileName + '.' + contentType;
        //console.log('上传的文件信息:',des_file);
        
        //如果目录不存在，则创建目录
        this.app.helper.mkdir(filePath);
        fs.readFile( obj.req.files[0].path, function (err, data) {
            fs.writeFile(des_file, data, function (err) {
                if( err ){
                    console.log( err );
                }else{
                    response = {
                        state   : 1,
                        message : 'File uploaded successfully',
                        filename: fileName,
                        url     : obj.path + typeDir + fileName + '.' + contentType,
                    };
                }
                
                obj.res.end( JSON.stringify( response ) );
            });
        });
    }
}

module.exports = Model;