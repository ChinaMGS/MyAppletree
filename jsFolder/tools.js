var Tools = {
	serverRequest: function (url,options,callback){
        $.ajax({
            url:url,
            type: "POST",
            data: options,
            // dataType: 'jsonp',
            // jsonp:'callback',
            // jsonpCallback:'success_jsonpCallback',
            beforeSend: function(xhr,settings) {
                //xhr.setRequestHeader("token", localStorage.token||'');
                //xhr.setRequestHeader("from", "pc");
                //设置跨域请求头
                //xhr.setRequestHeader('Access-Control-Allow-Origin','*');
                //xhr.setRequestHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS,DELETE');
                //xhr.setRequestHeader('Access-Control-Allow-Headers','x-requested-with,content-type');
            }
        }).then(function(data) {
            callback(data);
        });
	},
    serverRequestAjax: function (url,options,callback){
        $.ajax({
            url:url,
            type: "POST",
            dataType: 'jsonp',
            /*jsonp:'callback',
            jsonpCallback:'success_jsonpCallback',*/
            data: options,
            beforeSend: function(xhr,settings) {
                //xhr.setRequestHeader("token", localStorage.token||'');
                //xhr.setRequestHeader("from", "pc");
                //设置跨域请求头
                //xhr.setRequestHeader('Access-Control-Allow-Origin','*');
                //xhr.setRequestHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS,DELETE');
                //xhr.setRequestHeader('Access-Control-Allow-Headers','x-requested-with,content-type');
            }
        }).then(function(data) {
            callback(data);
        });
    },
    serverRequestjson: function (url,options,callback){
        $.ajax({
            url:url,
            type: "POST",
            // dataType: 'jsonp',
            // jsonp:'callback',
            // jsonpCallback:'success_jsonpCallback',
            data: options,
            beforeSend: function(xhr,settings) {
                //xhr.setRequestHeader("token", localStorage.token||'');
                //xhr.setRequestHeader("from", "pc");
                //设置跨域请求头
                //xhr.setRequestHeader('Access-Control-Allow-Origin','*');
                //xhr.setRequestHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS,DELETE');
                //xhr.setRequestHeader('Access-Control-Allow-Headers','x-requested-with,content-type');
            }
        }).then(function(data) {
            callback(data);
        });
    },
    serverRequestApi: function (url,options,callback){
        $.ajax({
            url:url,
            type: "POST",
            data: options,
            dataType: 'jsonp',  
            async: true,
            beforeSend: function(xhr,settings) {
                //xhr.setRequestHeader("token", localStorage.token||'');
                //xhr.setRequestHeader("from", "pc");
                //设置跨域请求头
                //xhr.setRequestHeader('Access-Control-Allow-Origin','*');
                //xhr.setRequestHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS,DELETE');
                //xhr.setRequestHeader('Access-Control-Allow-Headers','x-requested-with,content-type');
            }
        }).then(function(data) {
            callback(data);
        });
    },
    formatDate: function (time){
        var date = new Date(time);
        var month = date.getMonth() > 9 ? date.getMonth()+1 : '0'+(date.getMonth()+1);
        var day = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
        var year = date.getFullYear();
        var hour = date.getHours() > 9 ? date.getHours() : '0'+date.getHours();
        var minute = date.getMinutes() > 9 ? date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() > 9 ? date.getSeconds() : '0'+date.getSeconds();
        return `${minute}:${second}`;
        //return `${year}-${month}-${day}`;
    },
    /**
     * 发送验证码倒计时
     * @param {[dom]} dom  [按钮]
     * @param {[number]} time [倒计时时长]
     * @param {[string]} cls [不可点击样式]
     */
    countdown: function (dom,time,cls) {
        var _this = this;
        dom.html(time+'s后重发').addClass(cls);
        var timer = setTimeout(function() {
            time -= 1;
            dom.html(time+'s后重发');
            _this.countdown(dom,time,cls);
        },1000);
        if(time == 0) {
            clearTimeout(timer);
            dom.html("重发验证码").removeClass(cls);
        }
    },
    /**
     * [getElementLeft 获取绝对位置的横坐标]
     * @param  {[type]} element [description]
     * @return {[type]}         [description]
     */
    getElementLeft: function(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualLeft;
　　},
    /**
     * [getDeviceType 获取设备类型]
     * @return {[type]} [description]
     */
    getDeviceType: function(){
        var device,isAndroid = (/android/gi).test(navigator.appVersion),
        isIDevice = (/iphone|ipad/gi).test(navigator.appVersion);
        if(isAndroid){
            device = 'android';
        }
        if(isIDevice){
            device = 'ios';
        }
        return device;
    },
    /**
     * [description]
     * @return {[type]} [stopTouchendPropagationAfterScroll 阻止滑动后touchend冒泡]
     */
    stopTouchend: function(){
        var flag = false;
        window.addEventListener('touchmove', function(ev){
            flag || (flag = true, window.addEventListener('touchend', stopTouchendPropagation, true));
        }, false);
        function stopTouchendPropagation(ev){
            ev.stopPropagation();
            setTimeout(function(){
                window.removeEventListener('touchend', stopTouchendPropagation, true);
                flag = false;
            }, 50);
        }
    },
    /**
     * [getWeek 返回星期几]
     * @return {[type]} [description]
     */
    getWeek: function(time){
        if(!time){
            var d = new Date();
        }
        if(time){
            var d = new Date();
        }
        var weekday = new Array(7);
        weekday[0]="星期日";
        weekday[1]="星期一";
        weekday[2]="星期二";
        weekday[3]="星期三";
        weekday[4]="星期四";
        weekday[5]="星期五";
        weekday[6]="星期六";
        return weekday[d.getDay()];
    } 
     
}
/**
 * 时间格式化
 * 格式：
 * 年(y)可以用 1-4 个占位符；
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符；
 * 毫秒(S)只能用 1 个占位符(是 1-3 位的数字)。
 * 用例：
 * new Date().Format("yyyy-MM-dd") --> 2006-07-02
 * new Date().Format("yyyy-MM-dd hh:mm:ss") --> 2006-07-02 08:09:04
 * new Date().Format("yyyy-MM-dd hh:mm:ss.S") --> 2006-07-02 08:09:04.423
 * @param {时间格式，如：yyyy-MM-dd、yyyy-MM-dd hh:mm:ss} fmt
 * @return {字符串}
 */
Date.prototype.Format = function(fmt) {
    var o = {
        "M+" : this.getMonth() + 1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
        "S"  : this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt=fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("("+ k +")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
    return fmt;   
}
$('.js-back').on('touchend',function(){
    //android 标识
    var so =  getCookie("device");
    if(so == 'android'){
        window.Android.back();
    }else{
        history.go(-1);
    }
})
/*判断浏览器是否是移动端*/
function isMobile () {
    return navigator.userAgent.match(/(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i);
} 
/*防止滑动是触发thouchend*/
function stopTouchendPropagationAfterScroll(){
    var locked = false;
    window.addEventListener('touchmove', function(ev){
        locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
    }, true);
    function stopTouchendPropagation(ev){
        ev.stopPropagation();
        window.removeEventListener('touchend', stopTouchendPropagation, true);
        locked = false;
    }
}
/*
判断图片是否存在
 */
function nofind(){
    var img=event.srcElement; 
    img.src="images/default.png";
	img.onerror=null; 
}
//删除数组中的指定元素
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}
//var somearray = ["mon", "tue", "wed", "thur"]
//removeByValue(somearray, "tue");
/*
融云获取消息列表
 */
function getallMlist(io){
            var s = localStorage.psvtlist;
            var e = new Array();
            var a = new Array();
            if(s != undefined){
                e = s.split("*");
                console.log(s);
                console.log(e);
                for(var i =0;i<e.length;i++){
                    if(e[i]!=""){
                        a[i] = JSON.parse(e[i]);
                    }
                }
                console.log(a);
                /*for(var z = 0; z < io.length; z++){
                    var t = 0;//是否有相同
                    var m ;//相同的点
                    for(var j =0;j<a.length;j++){
                        if(a[j].targetId == io[z].targetId){
                            t = 1;
                            m = j;
                        }
                    }
                    if(t){
                        a.splice(m,1,io[z]);
                    }else{
                        a.push(io[z]);
                    }
                }*/
                for(var z = 0; z < io.length; z++){
                    a.push(io[z]);
                }
                console.log(a);
                a.reverse();
                var hash = {};
                a = a.reduce(function(item, next) {
                            hash[next.targetId] ? '' : hash[next.targetId] = true && item.push(next);
                            return item
                }, [])
                console.log(a);
                console.log("1");
                return a; //返回消息列表数组
            }else{
                for(var q = 0; q < io.length; q++){
                    if(io[q]!=""){
                        a[q] = io[q];
                    }
                }
                console.log("2");
                return a; //返回消息列表数组
            }
            
        }
/*
数组去重
 */
        /*var hash = {};
        array = array.reduce(function(item, next) {
                    hash[next.name] ? '' : hash[next.name] = true && item.push(next);
                    return item
        }, [])*/
/*
融云大于99的判断
 */
function nn(array){
    var shuz = new Array();
    for(var s=0;s<array.length;s++){
                        if(array[s].unreadMessageCount>99){
                            array[s].unreadMessageCount = "99+";
                            shuz.push(array[s]);
                        }else{
                            shuz.push(array[s]);
                        }
                    }
    return shuz;
}
/*获取token 中的值*/
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}