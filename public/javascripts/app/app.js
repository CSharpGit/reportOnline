var app = {
    //datasync: $(document).find('[data-sync]'), //获取对象
    dataAsync: $(document).find('[data-async]'),        //获取对象
    formAsync: $(document).find('[data-form-async]'),
    //表单项记忆对象
    formMemory: $(document).find('form'),

    syncProcess: function(event, obj, callback) {
        event.preventDefault(); //默认阻止提交
        var uri            = $(obj).attr('data-uri');
            localtion.href = uri;
    },
    /**
     * 示列 <a href="#" class="" data-async="get" data-uri="/admin/manager/addManager">添加管理员</a>
     * @attr {data-async} 必填属性 @param get或post 请求
     * @attr {data-uri}  必填属性 @param url 请求的方法或渲染页面的方法
     * @param {event} 事件监听 
     * @param {obj} 对象本身 
     * @param {callback} 回调函数 
     */
    asyncProcess: function(event, obj, callback) {
        event.preventDefault(); //默认阻止提交
        var meched = $(obj).attr('data-async').toLowerCase($(obj).attr('data-async'));  //获取提交方式
        var uri    = $(obj).attr('data-uri');
        if (!uri) {
            alert('请写入url');
            return false;
        }
        //判断是post提交还是个get提交
        if (meched == 'get') {
            $.ajax({
                url     : uri,
                type    : 'get',
                dataType: 'json',
                success : callback
            });
        } else {
            alert('data-async参数错误');
            return false;
        }


    },


    /**
     * 示列 <form method="post"  data-form-async='json' action="/admin/index/form">
     * @attr {method} @param {post} 必填属性及参数
     * @attr {data-form-async}必写属性 @param {html/json} 必填参数 希望返回的格式是html还是json
     * @attr {action}必写属性 @param {url} 必填参数 请求的方法路劲
     * @param {event} 事件监听 
     * @param {obj} 对象本身 
     * @param {callback} 回调函数 
     */
    formProcess: function(event, obj, callback) {
        event.preventDefault(); //默认阻止提交
        //获取对象的提交方式及请求的url
        var url = $(obj).attr('action');
        if (!url) {
            alert('请填写action属性的正确值');
            return false;
        }
        var method = $(obj).attr('method').toLowerCase($(obj).attr('method'));
        if (method != 'post') {
            alert('请填写method属性的正确值');
            return false;
        }
        var async = $(obj).attr('data-form-async').toLowerCase($(obj).attr('data-form-async'));
        if (async != 'html' && async != 'json') {
            alert('请填写data-form-async属性的正确值');
            return false;
        }
        //获取对象的值
        var formData = $(obj).serialize();
        $.ajax({
            url     : url,
            type    : method,
            data    : formData,
            dataType: async,
            success : callback
        });

    },

    /**
     * 顶部提示信息
     */
    notice: function(obj, callback) {
        var box = {
            notice_0: '<div id="notice_0" class="alert alert-success" role="alert">' + obj.message + '</div>',
            notice_1: '<div id="notice_1" class="alert alert-warning" role="alert">' + obj.message + '</div>',
            notice_2: '<div id="notice_2" class="alert alert-info" role="alert">' + obj.message + '</div>',
            notice_3: '<div id="notice_3" class="alert alert-danger" role="alert">' + obj.message + '</div>',
            notice_4: '',
        }
        var notice = 'notice_' + obj.error;
        $('body').prepend($(box[notice]).css({
            'text-align': 'center',
            'position'  : 'fixed',
            'width'     : '100%',
            'z-index'   : 999999,
        }));
        setTimeout(function() {
            $("#" + notice).remove();
            if (callback) callback(true);
        }, 2000);
    },

    /**
     * 
     * @param {获取url参数} name 
     */
    getQueryString: function(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    }, 

    /**
     * 将表单项的值存储到表单记忆
     */
    memory: function(){
        app.formMemory.submit(function(){
            $(app.formMemory).find('input').each(function(item,value){
                sessionStorage.setItem($(value).attr('name'),$(value).val());
            });
            $(app.formMemory).find('select').each(function(item,value){
                sessionStorage.setItem($(value).attr('name'),$(value).val());
            });
            $(app.formMemory).find('textarea').each(function(item,value){
                sessionStorage.setItem($(value).attr('name'),$(value).val());
            });
        });
    },

    /**
     * 恢复表单记忆值
     */
    remember: function(){
        $(app.formMemory).find('input').each(function(item,value){
            var key = $(value).attr('name');
            if($(value).val() === ' '){
                $(value).val(sessionStorage.getItem(key));
            }
        });
        $(app.formMemory).find('select').each(function(item,value){
            var key = $(value).attr('name');
            if($(value).val() === ' '){
                console.log(key,sessionStorage.getItem(key));
                $(value).val(sessionStorage.getItem(key));
            }
        });
    },


};

(function(){
    app.memory();
    app.remember();
})()