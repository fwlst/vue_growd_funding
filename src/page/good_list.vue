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
        <div class="confirm_pay_btn">确认支付<span class="price" v-show="orderInfoData.price">￥{{orderInfoData.price}}</span></div>
    </section>
</template>

<script>
    export default {
        name: '',
        data () {
            return {}
        },
        computed:{
            orderInfoData(){
                return this.$store.getters.getOrderInfoData;
            },
        },
        methods: {},
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
    }
</style>
