app.dataAsync.unbind('click').click(function(event) {
    app.asyncProcess(event, this, function(res) {
        if (res.uri) {
            //重定向到页面
            app.notice(res, function(bres) {
                if (bres) location.href = res.uri;
            });
        } else if('uri' in res){
            //重载当前页面
            app.notice(res, function(bres) {
                if (bres) location.reload();
            });
        } else if (res.message) {
            //只提示信息
            app.notice(res);
        } else {
            // $("#main").html(res);
        }

    });

});

// //a标签提交
// app.datasync.unbind('click').click(function(event) {
//     app.asyncProcess(event, this, function(res) {
//         console.log('res', res);
//         if (res.uri) {
//             app.notice(res, function(bres) {
//                 if (bres) location.href = res.uri;
//             });
//         } else if (res.message) {
//             app.notice(res);
//         } else {
//             // $("#main").html(res);
//         }

//     });

// });

//form表单提交不跳转
app.formAsync.submit(function(event) {
    event.preventDefault();
    console.log("表单被提交")
    app.formProcess(event, this, function(res) {
        //回调结果
        if (res.uri) {
            app.notice(res, function(bres) {
                if (bres) location.href = res.uri;
            });
        } else if (res.message) {
            app.notice(res);
        } else {
            // $("#main").html(res);
        }

    });
});