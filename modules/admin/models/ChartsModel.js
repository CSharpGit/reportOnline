function ChartsModel() {
    this.getOption = function (data, callback) {
        var struct = {
            where: [],
            groupBy: [],
            orderBy: [],
            limit: []
        };
        //获取路由参数
        var chartType = this.GET('type');

        //添加查询条件
        struct.where.push(" chart_type ='" + chartType + "'");

        //初始化构造查询对象
        var sqlStruct = this.SqlStruct(struct);

        //调用服务类进行查询
        var charts = this.service('Charts');
        charts.getOption(sqlStruct, function (res) {
            if (res.length) {
                callback(res);
            }
        });
    }

    this.getChartType = function (data, callback) {
        var struct = {
            where: [],
            groupBy: [],
            orderBy: [],
            limit: []
        };
        //添加查询条件
        //struct.where.push(" chart_type ='line'"); 

        //初始化构造查询对象
        var sqlStruct = this.SqlStruct(struct);

        //获取路由参数
        var chartType = this.GET('type');

        var chartTypes = [];

        //调用服务类进行查询
        var charts = this.service('Charts');
        charts.getChartType(sqlStruct, function (res) {
            if (res.length) {
                res.forEach(e => {
                    chartTypes.push(e.chart_type);
                });
                if (inArray(chartType, chartTypes)) {
                    callback(chartType);
                }
            }
        });

        function inArray(search, array) {
            for (var i in array) {
                if (array[i] == search) {
                    return true;
                }
            }
            return false;
        }
    }
}
module.exports = ChartsModel;