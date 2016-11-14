'use strict';
var urlBase = window.location.protocol;
var host = window.location.host;
var host = host.split(':')[0];
var urlBase = urlBase + '//'+ host + ':8090' + '/sxtx';
$(function(){
    //处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
    function banBackSpace(e){
        var ev = e || window.event;//获取event对象
        var obj = ev.target || ev.srcElement;//获取事件源

        var t = obj.type || obj.getAttribute('type');//获取事件源类型

        //获取作为判断条件的事件类型
        var vReadOnly = obj.getAttribute('readonly');
        var vEnabled = obj.getAttribute('enabled');
        //处理null值情况
        vReadOnly = (vReadOnly == null) ? false : true;
        vEnabled = (vEnabled == null) ? true : vEnabled;

        //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
        //并且readonly属性为true或enabled属性为false的，则退格键失效
        var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")
        && (vReadOnly || vEnabled!=true))?true:false;

        //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
        var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ?true:false;

        //判断
        if(flag2){
            return false;
        }
        if(flag1){
            return false;
        }
    }

    //禁止后退键 作用于Firefox、Opera
    document.onkeypress=banBackSpace;
    //禁止后退键 作用于IE、Chrome
    document.onkeydown=banBackSpace;
    window.history.forward(1);//屏蔽浏览器自带的后退键
});
Number.prototype.toFixed=function (d) {
    var s = this + "";
    if (!d)d = 0;
    if (s.indexOf(".") == -1)s += ".";
    s += new Array(d + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
        if (a == d + 2) {
            a = s.match(/\d/g);
            if (parseInt(a[a.length - 1]) > 4) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] == 10) {
                        a[i] = 0;
                        b = i != 1;
                    } else break;
                }
            }
            s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
        }
        if (b)s = s.substr(1);
        return (pm + s).replace(/\.$/, "");
    }
    return this + "";

};
angular.module('app', ['angularFileUpload', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngCookies', 'swalk.footer', 'swalk.user',
    'swalk.menu', 'swalk.category', 'swalk.notice', 'swalk.butlerService', 'swalk.house.list', 'swalk.house.info', 'swalk.repair',
    'swalk.service', 'swalk.assetInfo', 'swalk.order', 'swalk.assetIncome', 'swalk.product', 'swalk.login', 'swalk.city','swalk.indexBanner',
    'swalk.productTravel','swalk.productTravel.info','ng.ueditor','swalk.providerTravel','summernote','swalk.orderTravel','swalk.appointment',
    'swalk.confirm', 'swalk.settlementOrder','swalk.travelBannerList','tm.pagination'])
    .directive('datetimez', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                var minView = element.data("minview");
                element.datetimepicker({
                    autoclose: true,
                    minView: minView == 0 ? minView : 2,
                    format: minView == 0 ? 'yyyy-mm-dd hh:ii:ss' : 'yyyy-mm-dd',
                    language: 'zh-CN',
                    startDate: '2013-01-01',      // set a minimum date
                    endDate: '2099-10-10'          // set a maximum date
                }).on('changeDate', function (e) {
                    if(e.date != null){
                        ngModelCtrl.$setViewValue(e.date);
                        scope.$apply();
                    }
                });
            }
        };
    })
    .directive('checknub', function(){
        return {
            restrict: 'A',
            require: '',
            link: function (scope, element) {
                element.on("keyup",function(){
                    element.val(element.val().replace(/\D/g,''));
                })
            }
        }
    })
    .config(function ($urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/user/house/list");
        //session拦截器
        $httpProvider.interceptors.push('sessionInjector');

        if( !$httpProvider.defaults.headers.get ) {
            $httpProvider.defaults.headers.get = {};
        }
        // 禁用 IE AJAX 请求缓存
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }).constant('config', {
        //后端url，先写成常量
        //urlBase: urlBase,
        urlBase: 'http://172.16.1.176:8090/sxtx',
        //urlBase: 'http://123.56.87.160:8090/sxtx',
        //session 存储时间调整需要跟后台配合
        sessionCheckTime: 2400000,
        //selectizeSize 数量
        selectizeSize: 10,
        //图片上传大小上限
        imageSize: 512000,
        imageCount: 100
    })
    .service('categoryListService', function (config, $http, $q) {
        this.query = function (type) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: config.urlBase + "/user/category/list/" + type
            }).success(function (data) {
                return deferred.resolve({list: data});
            });
            return deferred.promise;
        };
    })
    //把时间去掉小时分钟
    .service('initTimeService', function () {
        this.query = function (string) {
            if(string instanceof Date){
                var newtime = new Date();
                newtime.setFullYear(string.getFullYear());
                newtime.setMonth(string.getMonth());
                newtime.setDate(string.getDate());
                newtime.setHours('00');
                newtime.setMinutes('00');
                newtime.setSeconds('00');
                return newtime;
            }else if(string.length > 12){
                var newtime = new Date();
                var oldTime = string.split("-");
                newtime.setFullYear(oldTime[0]);
                newtime.setMonth(oldTime[1] - 1);
                newtime.setDate(oldTime[2].substring(0,2));
                newtime.setHours('00');
                newtime.setMinutes('00');
                newtime.setSeconds('00');
                return newtime;
            }else{
                var newtime = new Date();
                var oldTime = string.split("-");
                newtime.setFullYear(oldTime[0]);
                newtime.setMonth(oldTime[1] - 1);
                newtime.setDate(oldTime[2]);
                newtime.setHours('00');
                newtime.setMinutes('00');
                newtime.setSeconds('00');
                return newtime;
            }
        };
        this.stringToDate = function(string) {
            if(string instanceof Date){
                return string;
            }else{
                var time = new Date();
                var frist = string.split(' ');
                var second = frist[0].split('-');
                var third = frist[1].split(':');
                time.setFullYear(second[0]);
                time.setMonth(second[1]-1);
                time.setDate(second[2]);
                time.setHours(third[0]);
                time.setMinutes(third[1]);
                time.setSeconds(third[2]);
                return time;
            }
        };
        this.dateToString = function(string) {
            var addZero = function (string) {
                if(string < 10){
                    var newS = "0" + string;
                    return newS;
                }else{
                    return string;
                }
            };
            if(string instanceof Date){
                var newMonth = addZero(string.getMonth() + 1);
                return string.getFullYear() + '-' + newMonth + '-' + addZero(string.getDate());
            }else{
                return string;
            }
        };

    })
    //后端请求session验证服务
    .service("sessionService", function ($http, config) {
        this.service = function (token) {
            $http({
                method: "POST",
                url: config.urlBase + '/login/checkToken',
                data: token
            }).success(function (data) {

            });
        };
    })
    //心跳请求
    .service("sessionCheck", function ($interval, $cookies, sessionService, config) {
        $interval(function () {
            console.log("xintiao--------" + new Date() + "------------", $cookies.get("token"));
            if (!$cookies.get("token")) {
                return;
            }
            sessionService.service($cookies.get("token"));
        }, config.sessionCheckTime);
    })
    //执行心跳
    .run(function (sessionCheck, $http, $cookies, sessionService) {
        if($cookies.get("token")){
            sessionService.service($cookies.get("token"));
            $http.defaults.headers.common.token = $cookies.get("token");
        }
    })
    //session拦截器
    .factory("sessionInjector", function ($q, $rootScope, $cookies) {
        return {
            request: function (config) {
                //前端拦截
                if (config.url.indexOf("/user/") != -1 && !$cookies.get("token")) {
                    console.log("InjectorStart--------------------", $cookies.get("token"));
                    $rootScope.$emit("userIntercepted", "noLogin");
                    return config;
                }
                return config;
            },
            responseError: function (response) {
                console.log("responseError--------------------", $cookies.get("token"));
                if (response.status == -1) {
                    console.log("responseError--------------------", response);
                    $rootScope.$emit("userIntercepted", "noLogin");
                    return $q.reject(response);
                }
                return $q.reject(response);
            }
        }
    })
    .controller("noLogin", function ($rootScope, $state, $cookies) {
        $rootScope.$on('userIntercepted', function (event, data) {
            console.log("noLoginClear--------------------", $cookies.get("token"));
            //$cookies.remove("token");
            $state.go('login');
        });
    })
    .service("typeConversion", function () {
        this.doubleToLong = function (num) {
            var doubleStr = num + "";
            var index = doubleStr.indexOf(".");
            if (index == -1) {
                return Number(doubleStr + "00");
            } else {
                if (doubleStr.substr(index+1).length === 1){
                    return Number(doubleStr.substr(0, index) + doubleStr.substr(index+1, 1) + "0");
                } else {
                    return Number(doubleStr.substr(0, index) + doubleStr.substr(index+1, 2));
                }

            }
        };
        this.longToDoubleFour = function (num) {
            var longStr = num + "";
            var index = longStr.length;
            if (index > 4) {
                return Number(longStr.substr(0, index - 4) + "." + longStr.substr(index - 4));
            } else if (index == 4) {
                return Number("0." + longStr);
            } else if (index == 3) {
                return Number("0.0" + longStr);
            } else if (index == 2) {
                return Number("0.00" + longStr);
            } else if (index == 1) {
                return Number("0.000" + longStr);
            } else {
                console.log("longToDouble错误，没有数字");
                return "";
            }
        };
    })
    .service("aspectRatio",["alertOrConfirm","$timeout","$q",function(alertOrConfirm,$timeout,$q){
        this.query = function(param){
            var aspectRatios = [];
            var imgAR = param.imgWidth / param.imgHeight;
            var createImg = function(){
                var deferred = $q.defer();
                for(var i = 0; i < param.items.length; i++){
                    var reader = new FileReader();
                    reader.onload = function(event){
                        var img = new Image();
                        img.src = event.target.result;
                        var aspectRatio = img.width / img.height;
                        var item = {
                            aspectRatio: aspectRatio,
                            imgWidth: img.width
                        };
                        aspectRatios.push(item);
                        deferred.resolve(aspectRatios);
                    };
                    reader.readAsDataURL(param.items[i]._file);
                }
                return deferred.promise;
            };
            createImg().then(function(aspectRatios){
                for(var i = 0; i < aspectRatios.length; i++){
                    if(aspectRatios[i].aspectRatio < imgAR*0.92 || aspectRatios[i].aspectRatio > imgAR*1.08 || aspectRatios[i].imgWidth < param.imgWidth*0.8){
                        param.queue.splice(param.queue.length - aspectRatios.length, aspectRatios.length);
                        alertOrConfirm.failAlert("图片尺寸/比例不匹配！");
                        return;
                    }
                }
            });
        }
    }])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function (event) {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                    //附件预览
                    scope.file = (event.srcElement || event.target).files[0];
                    scope.getFile(attrs.name);
                });
            }
        };
    }])
    .factory('fileReader', ["$q", "$log", function ($q, $log) {
        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            return reader;
        };
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);
            return deferred.promise;
        };
        return {
            readAsDataUrl: readAsDataURL
        };
    }])
    .directive('selfAdaption', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var bodyRightWidthCtrl = function () {
                    var windowWidth = window.innerWidth || document.body.clientWidth;
                    var bodyLeftWidth = parseInt(element.find("#bodyLeft").width());
                    var minWidht = 1200;
                    if (windowWidth >= minWidht) {
                        element.find("#bodyRight").width(windowWidth - bodyLeftWidth + 'px');
                        element.find("#bodyContainer").css("width", windowWidth - bodyLeftWidth - 40 + 'px')
                    } else {
                        element.find("#bodyRight").width(minWidht - bodyLeftWidth + 'px');
                    }
                };
                var bodyHeightCtrl = function () {
                    var windowHeight = document.documentElement.clientHeight;
                    var menuHeight = parseInt(element.find("#menu").height());
                    var bodyRightHeight = parseInt(element.find("#bodyRight").height());
                    var headHeight = 70;
                    var menu = element.find("#menu");
                    var bodyRight = element.find("#bodyRight");
                    element.height(windowHeight - headHeight + 'px');
                    if (bodyRightHeight > windowHeight - headHeight) {
                        bodyRight.css("overflow-y", "scroll");
                        bodyRight.width()
                    } else {
                        bodyRight.css("overflow-y", "auto");
                    }
                    if (menuHeight >= windowHeight - headHeight) {
                        menu.css("overflow-y", "scroll");
                    } else {
                        menu.css("overflow-y", "auto");
                    }

                };
                bodyHeightCtrl();
                bodyRightWidthCtrl();
                window.onresize = function () {
                    bodyRightWidthCtrl();
                    bodyHeightCtrl();
                }
            }
        }
    }).directive('ngThumb', ['$window', function ($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function (item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function (file) {
                var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function (scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({width: width, height: height});
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]).directive('stringToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function(value) {
                    return parseFloat(value);
                });
            }
        };
    })
    .directive('loginBackground',function(){
        return {
            restrict: 'A',
            link: function(scope, element){
                function widthAndHeightResize () {
                    var windowWidth = $(window).width();
                    var windowHeight = $(window).height();
                    element.height(windowHeight).width(windowWidth);
                }
                widthAndHeightResize();
                window.onresize = function () {
                    widthAndHeightResize();
                }
            }
        }
    })
    .directive('enterSearch',[function(){
        return {
            restrict: 'A',
            scope: {
                search: '&enterfun'
            },
            link: function (scope, ele, attr) {
                ele.bind("keypress",function(e){
                    if(e.keyCode == '13'){
                        scope.search();
                    }
                })
            }
        }
    }])
    .directive('downFile', ['$http','$cookies','alertOrConfirm',function ($http,$cookies,alertOrConfirm) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attr) {
                var ele = $(element);
                ele.on('click', function (e) {
                    if(attr.startDate > attr.endDate){
                        alertOrConfirm.failAlert("开始日期不能在结束日期之后");
                        return false;
                    }
                    ele.prop('disabled', true);
                    e.preventDefault();
                    $http({
                        url: attr.downFile,
                        method: 'get',
                        responseType: 'arraybuffer',
                        headers: {'token': $cookies.get("token")}
                    }).success(function (data, status, headers) {
                        ele.prop('disabled', false);
                        var type;
                        switch (attr.downFileType) {
                            case 'xlsx':
                                type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                                break;
                        }
                        if (!type) throw '无效类型';
                        var name = element.data("name");
                        saveAs(new Blob([data], { type: type }),name);
                    }).error(function (data, status) {
                        alert(data);
                        ele.prop('disabled', false);
                    });
                });
            }
        };
    }])
    .service("orderAmountService", function (typeConversion) {
        this.getAmountResult = function (order, userObj, orderDiscount) {
            var canRsSum = 0;
            var amountObj = {
                sum : '0.00',           //初始化订单总额
                paidSum : '0.00',       //已支付金额
                discountSum : '0.00',   //初始化优惠金额
                cashSum : '0.00',       //初始化现金支付金额
                rsSum : '0.00'          //初始化荣盛币支付金额
            };
            canRsSum += parseFloat(userObj.balanceA);
            //可用荣盛币
            if(userObj.balanceBList != null){
                userObj.balanceBList.forEach(function (item) {
                    if (order.startDate >= item.startDate && order.startDate <= item.endDate) {
                        canRsSum += parseFloat(item.money);
                    }
                });
            }
            amountObj.sum = order.sum;//订单总额
            amountObj.paidSum = order.paid;
            orderDiscount = typeConversion.doubleToLong(orderDiscount);
            var orderRs = amountObj.sum - amountObj.paidSum - order.serviceSum;
            var needPay = typeConversion.longToDoubleFour(typeConversion.doubleToLong(orderRs) * orderDiscount).toFixed(2);
            amountObj.rsSum = canRsSum <= needPay ? canRsSum.toFixed(2) : needPay;//荣盛币支付
            var rsRealSum = canRsSum <= needPay ? (typeConversion.doubleToLong(canRsSum) / orderDiscount).toFixed(2) : orderRs;//实际抵掉金额
            amountObj.discountSum = (rsRealSum - amountObj.rsSum).toFixed(2);
            amountObj.cashSum = (amountObj.sum - amountObj.paidSum - rsRealSum).toFixed(2);
            return amountObj;
        };
    });


/*.service("numFormat", function () {
 this.numIsMoney = function (number){
 console.log("aa");
 if(isNaN(number) || number ==""){
 return "0.00";
 }else{
 //最多保留两位小数
 var e = parseFloat(number);
 var f = Math.round(e*100)/100;
 var s = f.toString();
 var rs = s.indexOf('.');
 if(rs < 0){
 s = s +".00";
 }else{
 while(s.length <= rs + 2){s += '0';}
 }
 return s;
 }
 };
 });*/


(function ($) {
    $.fn.datetimepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        today: "今日",
        clear: "清除",
        meridiem: ['am', 'pm'],
        suffix: ['st', 'nd', 'rd', 'th'],
        format: "yyyy-mm-dd",
        titleFormat: "yyyy年mm月",
        weekStart: 1
    };
}(jQuery));