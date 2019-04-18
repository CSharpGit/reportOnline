var fs = require('fs');
var path = require('path');

var Helper = {
    //循环创建多层目录
    mkdir: function(dirPath){
        if(fs.existsSync(dirPath)) return;
        if(!fs.existsSync(path.dirname(dirPath))){
            Helper.mkdir(path.dirname(dirPath));
        }
        fs.mkdirSync(dirPath)
    },

    /**
     * 检测给定的值是否在数组中，如果在则返回key。不在则返回-1
     * @param {*} array 
     * @param {*} value 
     */
    inArray: function(array,value){
        for(var a in array){
            if(array[a] == value) return a;
        }
        return -1;
    },

    /**
     * 检测给定的值是否在数组中，如果在则返回true。不在则返回false
     * @param {*} array 
     * @param {*} key 
     */
    keyExists: function(array,key){
        for(var a in array){
            //console.log(a,"======",key);
            if(a == key) return true;
        }
        return false;
    },
}

module.exports = Helper;