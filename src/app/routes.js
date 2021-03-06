'use strict'

angular.module('canhe.route', [])
    .config(function ($stateProvider, $urlRouterProvider,$httpProvider,$ionicConfigProvider) {
        $stateProvider
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "app/modules/tabs/tabs.html"
            })
            .state('tabs.list', {
                url: "/list",
                views: {
                    'list-tab': {
                        templateUrl: "app/modules/list/list.html",
                        controller:'mylist'
                    }
                }
            })
            //商品详情
            .state('detail',{
                url:"/detail",
                templateUrl:"app/modules/detail/detail.html",
                controller:"proDetail"
            })
            .state('tabs.mine', {
                url: "/mine",
                views: {
                    'mine-tab': {
                        templateUrl: "app/modules/mine/mine.html",
                        controller:'mine'
                    }
                }
            })
            .state('orders',{
                url:'/mine/order',
                templateUrl:'app/modules/orders/order.html',
                controller:'myOrders'
            })
            //收获地址
            .state('address',{
                url:'/mine/address',
                templateUrl:'app/modules/address/addr.html',
                controller:'address'
            })
            //积分
            .state('score',{
                url:'/mine/score',
                templateUrl:'app/modules/score/score.html',
                controller:'score'
            })
            .state('tabs.car', {
                url: "/car",
                cache:"false",
                views: {
                    'car-tab': {
                        templateUrl: "app/modules/car/car.html",
                    }
                }
            })
            /*.state('tabs.recholiday', {
                url: '/second/:id/:picid/:city',
                views: {
                    'home-tab': {
                        templateUrl: 'app/modules/home/home.holiday.html'
                    }
                }
            })*/
            /*.state('tabs.stay', {
                url: "/stay",
                views: {
                    'stay-tab': {
                        templateUrl: "app/modules/stay/stay.html",
                        controller: 'stayCtrl'
                    }
                }
            })
            .state('tabs.holiday', {
                url: "/holiday",
                views: {
                    'holiday-tab': {
                        templateUrl: "app/modules/holiday/holiday.html",
                        controller: 'holidayCtrl',
                        controllerAs:'holidaytab'
                    }
                }
            })*/


            /*.state('login',{
                url:'/login',
                templateUrl:'app/modules/login/login.html',
                controller:'userLogin',
                controllerAs:'login',
                cache:'false'
            })
            //找回密码
            .state('repassword',{
                url:'/reset/possword',
                templateUrl:'app/modules/repassword/reback.html',
                controller:'resetPassword',
                controllerAs:'repass',
                cache:false
            })
            .state('changetype',{
                url:'/change/type',
                templateUrl:'app/modules/change/type.html',
                controller:'changeType',
                cache:'false'
            })
            .state('identity',{
                url:'/change/identity/:memery',
                templateUrl:'app/modules/identity/identity.html',
                controller:'identity',
                cache:'false'
            })
            .state('reset',{
                url:'/change/reset/:memery',
                templateUrl:'app/modules/reset/reset.html',
                controller:'reset',
                cache:'false'
            })
            .state('confirm',{
                url:'/change/confirm/:memery',
                templateUrl:'app/modules/confirm/confirm.html',
                controller:'confirm',
                cache:'false'
            })
            .state('goods',{
                url:'/goods/orders/:from',
                templateUrl:'app/modules/goods/goods.html',
                controller:'myOrders',
                controllerAs:'goods',
                cache:'false'
            })
            //用户常用联系人信息
            .state('comlinkman',{
                url:'/mine/linkman',
                templateUrl:'app/modules/comlink/linkman.html',
                controller:'linkman',
                cache:'false'
            })
            //我的收藏
            .state('collection',{
                url:'/mine/store',
                templateUrl:'app/modules/store/store.html',
                controller:'mineStore',
                cache:'false'
            })
            //我的荣盛币
            .state('rsb',{
                url:'/rsb/myrsb',
                templateUrl:'app/modules/rsb/rsb.html',
                cache:'false',
                controller:'myrsb'
            })
            //赠与输入手机号
            .state('giftrsb',{
                url:'/gift/rsb',
                templateUrl:'app/modules/rsbgive/give.html',
                controller:'giftrsb',
                cache:false
            })
            //确认赠与荣盛币
            .state('ensureGive',{
                url:'/ensure/give',
                templateUrl:'app/modules/rsbgive/sure.html',
                controller:'suregive'
            })
            .state('giftresult',{
                url:'/result/gift/:status',
                templateUrl:'app/modules/rsbgive/result.html',
                controller:'resultgive'
            })
            //优惠券
            .state('coupon', {
                url: "/coupon",
                templateUrl: "app/modules/coupon/coupon.html",
                controller: 'couponCtrl'
            })
            .state('couponDetail', {
                url: "/coupon/:id",
                templateUrl: "app/modules/coupon/coupon.detail.html",
                controller: 'couponDetailCtrl'
            })
            //可用优惠券
            .state('couponChoice',{
                url:'/choice/coupon',
                templateUrl:'app/modules/coupon/coupon.choice.html',
                controller:'couponChoice'
            })
            //购买荣盛币
            .state('buyrsb',{
                url:'/buyrsb/buy',
                templateUrl:'app/modules/buyrsb/buy.html',
                cache:'false',
                controller:'buyrsb'
            })
            //荣盛币使用说明
            .state('explain',{
                url:'/explain',
                templateUrl:'app/modules/rsb/explain.html',
                controller:'rsbexplain',
                cache:'false'
            })
            //荣盛币购买说明
            .state('buyexplain',{
                url:'/buyrsb/explain',
                templateUrl:'app/modules/buyrsb/explain.html'
            })
            //支付结果
            //0-支付成功 1-未完全支付 2-未支付
            .state('payresult',{
                url:'/pay/result/:status',
                templateUrl:'app/modules/results/payment.html',
                controller:'payment'
            })
            //我的资产
            .state('asset',{
                url:'/asset',
                templateUrl:'app/modules/asset/asset.html'
            })
            .state('assetDetail',{
                params:{"type": null},
                url:'/asset/detail',
                templateUrl:'app/modules/asset/asset.detail.html',
                controller:'assetDetailCtrl'
            })
            .state('assetNews',{
                url:'/asset/news',
                templateUrl:'app/modules/asset/asset.news.html',
                controller:'assetNewsCtrl'
            })
            .state('assetIncome',{
                url:'/asset/income',
                templateUrl:'app/modules/asset/asset.income.html',
                controller:'assetIncomeCtrl'
            })
            .state('assetHousekeeper',{
                url: '/asset/housekeeper',
                templateUrl: 'app/modules/asset/asset.housekeeper.html',
                controller: 'housekeeperCtrl'
            })
            .state('assetHousekeeperReservation',{
                params:{"date": null,"appoint": false},
                url: '/asset/housekeeper/reservation',
                templateUrl: 'app/modules/asset/asset.housekeeper.reservation.html',
                controller: 'housekeeperReservationCtrl'
            });*/
        $urlRouterProvider.otherwise("/tab/list");
    });
