<template>
    <section class="order">
        <div class="order_info clearFix">
            <div class="left">
                <img src="../assets/img/500M.png">
                <div class="img_text">{{orderInfoData.prizeName}}</div>
            </div>
            <div class="right">
                <div class="price">￥{{orderInfoData.price}}</div>
                <div class="order_content">
                    <div class="order_content_desc">{{orderInfoData.prizeDetail}}</div>
                    <div class="order_nub">订单号:{{orderInfoData.orderNo}}</div>
                </div>
            </div>
        </div>
        <div class="pay_list">
            <div class="pay_item clearFix">
                <div class="left"><img src="../assets/img/icon-wechat.png"></div>
                <div class="center">
                    <div class="title">微信支付</div>
                    <div class="pic">推荐安装V5.0及以上版本使用</div>
                </div>
                <div class="right">
                    <div class="choice active"></div>
                </div>
            </div>
        </div>
        <div class="confirm_pay_btn" @click="pay">确认支付<span class="price" v-show="orderInfoData.price">￥{{orderInfoData.price}}</span></div>
    </section>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                wxPayData: {}
            }
        },
        computed:{
            orderInfoData(){
                return this.$store.getters.getOrderInfoData;
            },
        },
        methods: {
            pay(){
                let orderNo = this.orderInfoData.orderNo;
                console.log('orderInfoData:',orderNo)
                this.$store.commit('updateGoodListPostData',{orderNo: orderNo});
                this.$store.dispatch('fatchGoodListData').then((res) => {
                    this.wxPayData = res;
                    console.log(res );
                    this.wxPay();
                },(err) => {
                    this.$toast({message: err.msg, position: 'bottom', duration: 3000});
                });
            },
            wxPay(){
                let wxPayData = this.wxPayData,
                    wxAppId = wxPayData.appId,
                    wxTimestamp = wxPayData.timestamp,
                    wxNonceStr = wxPayData.nonceStr,
                    wxPaySign = wxPayData.paySign,
                    wxPackage = wxPayData.package;
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: wxAppId, // 必填，公众号的唯一标识
                    timestamp: wxTimestamp, // 必填，生成签名的时间戳
                    nonceStr: wxNonceStr, // 必填，生成签名的随机串
                    signature: wxPaySign,// 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function(){
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    wx.chooseWXPay({
                        timestamp: wxTimestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: wxNonceStr, // 支付签名随机串，不长于 32 位
                        package: wxPackage, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: wxPaySign, // 支付签名
                        success: function (res) {
                            // 支付成功后的回调函数
                            if(res.errMsg == "chooseWXPay:ok" ) {
                                this.$router.push({
                                    name: 'Pay_success'
                                });
                            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        }
                    });
                });
            }
        },
        mounted () { // 代替ready

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less" scoped>
    .order{
        .order_info{
            height: 94px;
            padding: 0 15px;
            margin-bottom: 15px;
            background: #fff;
            .left{
                position: relative;
                padding: 10px 15px 10px 0;
                float: left;
                width: 25%;
                height: 74px;
                border-right: 1px solid #F2F1F1;
                img{
                    margin: 0 auto;
                    height: 100%
                }
                .img_text {
                    width: 82%;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    margin-top: -15px;
                    text-align: center;
                    font-size: 20px;
                    height: 30px;
                    line-height: 30px;
                    color: #fff;
                }
            }
            .right{
                padding: 10px 0 10px 5%;
                float: left;
                width: 64%;
                .price{
                    font-size: 22px;
                    padding-bottom: 15px
                }
                .order_content_desc{
                    font-size: 16px;
                    margin-bottom: 10px
                }
                .order_nub{
                    width: 226px;
                    font-size: 12px;
                    color: #666
                }
            }
        }
        .pay_list{
            background: #fff;
            margin-bottom: 60px;
            .pay_item{
                background: #fff;
                padding: 10px 0;
                .left{
                    float: left;
                    width: 20%;
                    height: 50px;
                    img{
                        margin: 0 auto;
                        height: 100%
                    }
                }
                .center{
                    float: left;
                    width: 63%;
                    padding-left: 2%;
                    .title{
                        font-size: 18px;
                        margin-bottom: 8px
                    }
                    .pic{
                        font-size: 12px
                    }
                }
                .right{
                    float: left;
                    width: 15%;
                    height: 50px;
                    .choice{
                        width: 30px;
                        height: 30px;
                        border: 1px solid #eee;
                        border-radius: 100%;
                        text-align: center;
                        margin-top: 10px;
                        &.active{
                            background: url(../assets/img/hook.png) center no-repeat #38ba7e;
                            background-size: 100% 100%;
                            border: none
                        }
                    }
                }
            }
        }
        .confirm_pay_btn{
            width: 70%;
            height: 50px;
            line-height: 50px;
            font-size: 22px;
            text-align: center;
            margin: 35px auto;
            border-radius: 50px;
            background: #ff6367;
            color: #fff;
            .price{
                font-weight: 700
            }
        }
    }
</style>
