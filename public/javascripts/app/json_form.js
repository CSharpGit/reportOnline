// 1. 简单的JSON对象进行遍历
function traverseJsonSimpleObj() {
    var jsonObj = { "name": "kevin", "age": 27, "sex": "男", "city": "shenzhen" };
    for (var key in jsonObj) {
        var html = "<p>"
        html += (key + ' : ' + jsonObj[key]);
        html += "</p>";
        $("#out").append(html);
    }
}

// 2. 遍历json数组，元素为json对象
function traverseJsonArray() {
    var jsonArray = [{ "name": "kevin", "age": 27, "sex": "男", "city": "shenzhen" },
    { "name": "kevin2", "age": 28, "sex": "男", "city": "beijing" }];
    //alert('JSON.stringify(jsonArray) = ' + JSON.stringify(jsonArray));
    for (var i = 0; i < jsonArray.length; i++) {
        var jsonObj = jsonArray[i];
        for (var key in jsonObj) {
            var html = "<p>"
            html += (key + ' : ' + jsonObj[key]);
            html += "</p>";
            $("#out").append(html);
        }
        $("#out").append("-----------------------------------------------------");
    }
}

// 3. 深度遍历复合Json结构数据
/**
 * 深度遍历
 * 复合的Json结构数据，JSON对象里面可以嵌套多层对象(数组或对象)
 */
function deepTraverse(json) {
    // 1. 变量为json对象：将key输出，value进行递归
    if (isType(json, "Object")) {
        var num = 0;
        for (var key in json) {
            num += 1;
            $("#out").append('<div class="form-group ' + key + '_' + num + '"><label class="col-sm-12 control-label">' + key + ' : ' + '</label></div>');
            if (isType(json[key], "Array") || isType(json[key], "Object")) {
                // $("#out").append("(<b>下面为子项内容</b>)<br/>");
            }
            deepTraverse(json[key]);
        }
    }
    // 2. 变量为json数组：逐个元素递归
    else if (isType(json, "Array")) {
        var no_obj = 0;
        for (var i = 0; i < json.length; i++) {
            var jsonObj = json[i];
            if (typeof jsonObj === 'object') {//如果数组中存在对象、数组等object类型，递归
                deepTraverse(jsonObj);
            } else {
                no_obj += 1;
            }
            // 遍历数组中的元素(为json对象)后输出：分隔线+一个换行符
            if (isType(jsonObj, "Object")) {
                // $("#out").append("------------------------<br/>");
            }
        }
        if (no_obj > 0 && no_obj == json.length) {
            $("#out").append('<div class="col-sm-12"><input type="text" class="form-control" placeholder="' + json.join(',') + '"></div>');
        }
    }
    // 3. 变量为简单数据类型：直接输出（递归函数的终止条件）
    else if (isType(json, "String") || isType(json, "Number") || isType(json, "Null")) {
        $("#out").append('<div class="col-sm-12"><input type="text" class="form-control" placeholder="' + json + '"></div>');
        $("#out").append("<br/>");
    }
    else if (isType(json, "Boolean")) {
        $("#out").append('<div class="col-sm-12"><input type="checkbox" class="js-switch" vaule="' + json + '" checked /></div>');
        $("#out").append("<br/>");
    }
}

// 辅助函数，JS判断变量类型
/**
  * 判断类型
  * @param obj 判断的变量
  * @param type 预期的类型
  */
function isType(obj, type) {
    return Object.prototype.toString.call(obj) === "[object " + type + "]";
}