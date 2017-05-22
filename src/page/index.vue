<template>
    <section class="index">
        <img class="index_img" src="../assets/img/a.png" alt="" width="100%"/>
        <ul class="info_list clearFix">
            <li class="list_item" v-for="(item,index) in activityData.itemData">
                <div class="bottom" v-grid>{{item.val}}
                    <div class="spot_box rotate clearFix">
                        <span class="spot"></span>
                    </div>
                </div>
                <div class="top">{{item.title}}</div>
            </li>
        </ul>
        <div class="goToPage_btn" :class="goToPageBtnActive" @click="gotoPage">{{goToPageBtnText}}</div>
        <div class="rule" v-show="activityData.remark != ''">
            <div class="top">
                <img class="title_bg" src="../assets/img/title_bg.png">
                <div class="rule_title">活动规则</div>
            </div>
            <div class="bottom" v-html="activityData.remark">
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data () {
            return {
                goToPageBtnText: '选择套餐',
                goToPageBtnActive: ''
            }
        },
        computed:{
            activityData(){
                return this.$store.getters.getActivityData;
            },
            postData(){
                return this.$store.getters.getPostData;
            },
        },
        methods: {
            init(){
                this.getOpenId();
            },
            //从地址获取openid 没有openid就去授权
            getOpenId: function () {
                let search=window.location.search.substr(1);
                let appId = 'wx5970f157ba6d8f82';
                if(search.indexOf("json")==-1){
                    let callback_url= 'http://test1-pawfhd.pingan.com.cn:31080/pawf-nop/rest/flowCrowdFunding/toHome';
                    callback_url=encodeURIComponent(callback_url);
                    //appid=wx91aafb5168f2d2fb  生产
                    //测试 appid=wx5970f157ba6d8f82
                    let warrantUrl='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appId +'&redirect_uri='
                        + callback_url+ '?activityId='+ this.postData.activityId +
                        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
                    window.location.href= warrantUrl;
                }
                let searchData=search.split("=")[1];
                let searchStr=decodeURIComponent(searchData);
                let dataJson=JSON.parse(searchStr);
                if(dataJson.code==200){
                    let openid = dataJson.data.openid;
                    let activityId = dataJson.data.activityId;
                    console.log(openid);
                    if(openid == 'oI3BwxC2Lew02d5UATAKx60PLCVQ'){
                        //范伟
                        openid = 'ol8HYt7QC1Uq4Od2HoqNEcUTu2Is';
                    }
                    this.$store.commit('updatePostPrizesData',{key:'openid', val:openid});
                }
                this.$store.dispatch('fatchActivityData').then((res) => {
                    this.renderGoToPageBtn();
                },(err) => {
                    this.$toast({message: err.msg, position: 'bottom', duration: 3000});
                });
            },
            renderGoToPageBtn(){
                let activityStatus = this.activityData.activityStatus;
                let orderPayment = this.activityData.orderPayment;
                if(activityStatus == 1){
                    if(orderPayment == 3){
                        this.goToPageBtnText = '购买记录';
                    }
                }else if(activityStatus == 2){
                    this.goToPageBtnText = '活动未开始';
                    this.goToPageBtnActive = 'active';
                }else if(activityStatus == 3){
                    if(orderPayment == 3){
                        this.goToPageBtnText = '购买记录';
                    }else {
                        this.goToPageBtnText = '活动已结束';
                        this.goToPageBtnActive = 'active';
                    }
                }
            },
            gotoPage(){
                let activityStatus = this.activityData.activityStatus;
                let orderPayment = this.activityData.orderPayment;
                if(activityStatus == 1 ){
                    if(orderPayment == 3){
                        console.log('订单详情');
                    }else {
                        this.$router.push({
                            name: 'Goods'
                        });
                    }
                }else if(activityStatus == 2){
                    this.$toast({
                        message: '活动未开始',
                        position: 'bottom',
                        duration: 5000
                    })
                }else if(activityStatus == 3){
                    this.$toast({
                        message: '活动已结束',
                        position: 'bottom',
                        duration: 5000
                    })
                }
            }
        },
        created(){
            this.init();
        },
        directives: {
            grid: {
                inserted: function (el) {
                    let height = el.getBoundingClientRect().width + 'px';
                    el.style.height = height;
                    el.style.lineHeight = height;
                }
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less">
    .index{
        .info_list{
            position: relative;
            margin: -10% 15px 35px;
            padding: 24px 0;
            border-radius: 15px;
            background: #fff;
            .list_item{
                width: 21%;
                float: left;
                text-align: center;
                margin: 5px 2%;
                .top{
                    font-size: 14px;
                }
                .bottom{
                    margin-top: 5px;
                    font-size: 14px;
                    color: #fff;
                    font-weight: 700;
                    margin-bottom: 10px;
                    border-radius: 100%;
                    position: relative;
                    letter-spacing: 2px;
                    .spot_box{
                        width: calc(100% + 6px);
                        position: absolute;
                        left: -1.5px;
                        top: 50%;
                        margin-top: -3px;
                        .spot{
                            float: left;
                            width: 6px;
                            height: 6px;
                            border-radius: 100%
                        }
                    }
                }
                &:nth-child(1) .bottom{
                    background: rgba(255, 99, 103, .8);
                }
                &:nth-child(2) .bottom{
                    background: rgba(249, 159, 96, .8);
                }
                &:nth-child(3) .bottom{
                    background: rgba(56, 186, 126, .8);
                }
                &:nth-child(4) .bottom{
                    background: rgba(83, 72, 89, .8);
                }
                &:nth-child(1) .bottom .spot{
                    background: #ff6367
                }
                &:nth-child(2) .bottom .spot{
                    background: #f99f60
                }
                &:nth-child(3) .bottom .spot{
                    background: #38ba7e
                }
                &:nth-child(4) .bottom .spot{
                    background: #534859
                }
            }

        }
        .goToPage_btn{
            width: 70%;
            height: 50px;
            line-height: 50px;
            font-size: 22px;
            text-align: center;
            margin: 35px auto;
            border-radius: 50px;
            background: #ff6367;
            color: #fff;
            &.active{
                background: #ddd;
                color: #999
            }
        }
        .rule{
            padding: 0 15px;
            color: #222;
            .top{
                width: 42.4%;
                font-size: 16px;
                margin: 0 auto 15px;
                text-align: center;
                position: relative;
                .title_bg{
                    width: 100%
                }
                .rule_title{
                    height: 22px;
                    line-height: 22px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -34px;
                    margin-top: -11px
                }
            }
            .bottom{
                font-size: 13px;
                line-height: 20px;
                margin-bottom: 20px;
                p{
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>
