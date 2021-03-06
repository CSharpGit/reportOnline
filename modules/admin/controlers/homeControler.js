function homeControler(){
    this.index = function () {
        var data={title:'主页'}
        // var userInfor=this.model("DataProcess").getUseInfo();
        // data.usName=userInfor[0].id;
        // console.log("########################获取session信息:",userInfor[0]);
        // console.log("#######################发送前端信息:",userInfor[0]['id']);
        this.render(data);
    }
    
    this.dbset = function () {
        var that=this;
        var usDb=this.model('UserDb');
        var data={};
        usDb.getDbInfo(data,function(res){
            that.render(res);
        });
    }

    this.allCharts = function () {
        this.render({});
    }
    this.getOption = function () {
        var that = this;
        var charts = this.model('Charts');
        var data = {};
        charts.getOption(data, function (res) {
            that.renderJson(JSON.parse(res[0].chart_option));
        });
    }
    this.charts = function () {
        var that = this;
        var charts = this.model('Charts');
        var data = {};
        charts.getChartType(data, function (res) {
            if (res) {
                that.render({type:res}, "charts");
            }
        });
    }
}

module.exports = homeControler;