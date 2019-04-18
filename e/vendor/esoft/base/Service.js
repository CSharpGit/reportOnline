var fs = require('fs');
var util = require('util');

var Service = {
    data      : [],
    serviceDir: '',
    /**
     * 实例化指定模块
     * @param {*} serviceName 
     */
    init: function(serviceName,data){
        //if(serviceName in this.data) return this.data[serviceName];
        
        try{
            var loadService                = require(this.serviceDir + '/' + serviceName + 'Service');
            var common                     = require('./Common');
                loadService.prototype.req  = this.req;
                loadService.prototype.res  = this.res;
                loadService.prototype.next = this.next;
                loadService.prototype.app  = this.app;
            util.inherits(loadService,common);
            var       service      = new loadService();
            this.data[serviceName] = service;
        }catch(err){
            console.log(err.Error);
        }

        return service || new Object();
    },
}

module.exports = Service;