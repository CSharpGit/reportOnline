function siteControler(){
    this.home = function(){
        console.log("中华人民共和国:");
        //this.model('Test').showApp();
        //this.service('Test').showApp();
        //console.log(this.app)
        this.render({title:'site'},'index');
    }
}


module.exports = siteControler;