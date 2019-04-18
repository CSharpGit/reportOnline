
function useControler(){
    
    this.dome = function(app){
        //调用数据库配置信息
        console.log('+++++++++++++===============+++++++++++')

        this.render({ title: 'Express' },'index');
    }


}

module.exports = useControler;