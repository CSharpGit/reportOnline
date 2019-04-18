function AddOnSysTemFunc() {}

/**
 * 检查传入的值是否在数组中，如果在则返回索引；如查不在则返回－1
 */
Object.prototype.array2value = function(array,key1,value,key2) {
	array = array || [];
    if(!array.length) return '';

    for(var i = 0; i < array.length; i ++){
		if(array[i][key1] == value) return array[i][key2];
	}
	return '';
}

/**
 * 合并多个对象
 * 
var objA = {
	a: '123',
	b: '456',
	c: 'ds'
};
var objB = {
	a : 'oh',
	b : 'hello',
	f : '你好',
	fd: 'world'
}
var objC = {
	a: 'goold',
	e: 'hello',
	b: 'world',
	f: '中华人民共和国'
}
merge([objA,objB,objC]);
结果为：
Object {a: "oh", b: "hello", c: "ds", f: "你好", fd: "world"}
 */
Object.prototype.mergeObj = function(objs){
	if(objs.constructor !== Array){
		console.log({
			error  : 1,
			message: '传的参数必须是多个对象的数组'
		});
		return false;
	}
	for(var i = 1; i < objs.length; i++){
		if(objs[i].constructor !== Object){
			console.log({
				error  : 1,
				message: '传参数的元素必须是对象'
			});
			return false;
		}
		for(var k in objs[i]){
			objs[0][k] = objs[i][k];
		}
	}
    return objs[0];
}


/**
 * 该方法用于从mysql数据库查询结果中获取所有key的值，以数组返回
 */
Object.prototype.queryresultKeyValue = function(obj, key) {
    var tem = [];
        obj = obj || {};
    for (var i in obj) {
        if (obj[i][key] === undefined) continue;
        tem.push(obj[i][key]);
    }

    return tem;
}

/**
 * 时间转换方法
 * @param date 中国标准时间 
 */
Object.prototype.getStandardDate = function(date,defaultVal) {
	defaultVal = defaultVal || '';
    if(!date) return defaultVal;
	var d = new Date(date);
	var Y =d.getFullYear();
	var m  = (d.getMonth().valueOf() + 1);
	var D = d.getDate();
	var h = d.getHours();
	var mi = d.getMinutes();
	var s = d.getSeconds();
	m = m > 9 ? m : '0' + m;
    return Y + '-' + m + '-' + D + ' ' + h + ':' + mi + ':' + s;
}

/**
 * %Y %m %d %H %M %S 分别表示年月日时分秒
 *  */
Object.prototype.dateFormate = function(formate,time){
	var date = new Date(time);
	var Y = date.getFullYear();
	var m = date.getMonth() > 9 ? date.getMonth() : date.getMonth() + 1;
	var d = date.getDate();
	var H = date.getHours();
	var M = date.getMinutes();
	var S = date.getSeconds();
	var str = formate;
	str = str.replace('%Y',Y);
	str = str.replace('%m',m);
	str = str.replace('%d',d);
	str = str.replace('%H',H);
	str = str.replace('%M',M);
	str = str.replace('%S',S);
	return str;
}

/**
 * --------------------- 
	作者：carllucasyu 
	来源：CSDN 
	原文：https://blog.csdn.net/carllucasyu/article/details/78569525 
	版权声明：本文为博主原创文章，转载请附上博文链接！
 */

Object.prototype.getWeekOfYear = function(date){
		date = date || null;
	  var today = new Date(date);

	  var firstDay = new Date(today.getFullYear(),0, 1);
	  var dayOfWeek = firstDay.getDay(); 
	  var spendDay= 1;
	  if (dayOfWeek !=0) {
	    spendDay=7-dayOfWeek+1;
	  }
	  firstDay = new Date(today.getFullYear(),0, 1+spendDay);
	  var d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
	  var result =Math.ceil(d/7);
	  return result+1;

};

	

Object.prototype.inArray = function(arr,val){
	for(var i = 0; i < arr.length; i ++){
		if(arr[i] === val) return i;
	}
	return false;
}


module.exports = AddOnSysTemFunc;