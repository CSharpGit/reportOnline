function adminControler() {
    this.index = function () {
        this.render({});
    }
    this.dbSet = function () {
        this.render({});
    }
    this.allCharts = function () {
        this.render({});
    }
    this.ajaxData = function () {
        var that = this;
        var charts = this.model('Charts');
        var data = {};
        charts.line(data, function (res) {
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
    this.login = function () {
        this.render({});
    }
    this.register = function () {
        this.render({});
    }
}

module.exports = adminControler;