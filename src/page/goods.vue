<template>
    <section class="goods">
        <img src="../assets/img/a.png" alt="" width="100%"/>
        <div class="goods_top">
            <h3 class="goods_title">
                <img class="title_bg" src="../assets/img/title_bg.png">
                <span class="rule_title">选择套餐</span>
            </h3>
            <ul class="goods_list clearFix">
                <li class="list_item clearFix" :class="goodItemActiveClass(index)" v-for="(good,index) in goods" :key="index" @click="tabListItem(index)">
                    <div class="good_img">
                        <img class="good_icon" src="../assets/img/500M.png" width="100%">
                        <div class="good_prizeName">{{good.prizeName}}</div>
                    </div>
                    <div class="bottom clearFix">
                        <div class="nowPrice">￥{{good.orderPrice}}</div>
                        <div class="oldPrice">￥{{good.price}}</div>
                    </div>
                    <div class="top">{{good.prizeDetail}}</div>
                </li>
            </ul>
        </div>
        <h3 class="phone_title">
            <img class="title_bg" src="../assets/img/title_bg.png">
            <span class="rule_title">参团手机</span>
        </h3>
        <div class="goods_form">
            <div class="form_item">
                <input class="phone_input" :value="postPrizesData.mobile" @input="updatePhone" type="tel" placeholder="请输入手机号"/>
            </div>
            <div class="form_item">
                <input class="code_inout" :value="postPrizesData.vcode" @input="updateCode" type="number" placeholder="请输入手机验证码">
                <div class="send_code" :class="" @click="sendCode">发送验证码</div>
            </div>
            <div class="submit_order_btn" @click="toBuy">提交订单</div>
        </div>
    </section>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                activeIndex: 0,
                sendCodeState: 0
            }
        },
        computed:{
            goods(){
                return this.$store.getters.getGoodsData;
            },
            postPrizesData(){
                return this.$store.getters.getPostPrizesData;
            },
            postData(){
                return this.$store.getters.getPostData;
            },
        },
        methods: {
            goodItemActiveClass(index){
                return this.activeIndex == index ? 'active' : '';
            },
            tabListItem(index){
                let prizeId = this.goods[index].prizeId;
                this.activeIndex = index;
                this.$store.commit('updatePostPrizesData',{prizeId:prizeId});
            },
            updatePhone(e){
                let mobile = e.target.value;
                if(mobile == ''){
                    this.$toast({message: '手机号不能为空', position: 'bottom', duration: 3000});
                    this.$store.commit('updatePostPrizesData',{mobile:mobile});
                }else {
                    this.$store.commit('updatePostPrizesData',{mobile:mobile});
                }
            },
            updateCode(e){
                let vcode = e.target.value;
                if(vcode == ''){
                    this.$toast({message: '验证码不能为空', position: 'bottom', duration: 3000});
                    this.$store.commit('updatePostPrizesData',{vcode:vcode});
                }else {
                    this.$store.commit('updatePostPrizesData',{vcode:vcode});
                }
            },
            sendCode(){
                let mobile = this.postPrizesData.mobile;
                if(mobile == ''){
                    this.$toast({message: '手机号不能为空', position: 'bottom', duration: 3000});
                }else  if(this.checkPhoneNumber(mobile)){
                    this.$toast({message: '请输入正确的手机号', position: 'bottom', duration: 3000});
                }else {
                    this.$store.dispatch('fatchSendCode').then((res) => {
                        this.$toast({message: res.msg, position: 'bottom', duration: 3000});
                    },(err) => {
                        this.$toast({message: err.msg, position: 'bottom', duration: 3000});
                    });
                }
            },
            toBuy() {
                let mobile = this.postPrizesData.mobile;
                let vcode = this.postPrizesData.vcode;
                if(mobile == ''){
                    this.$toast({message: '手机号不能为空', position: 'bottom', duration: 3000});
                }else  if(this.checkPhoneNumber(mobile)){
                    this.$toast({message: '请输入正确的手机号', position: 'bottom', duration: 3000});
                }else  if(vcode == ''){
                    this.$toast({message: '验证码不能为空', position: 'bottom', duration: 3000});
                }else {
                    this.$store.dispatch('fatchOrderInfoData').then((res) => {
                        this.$toast({message: '下单成功', position: 'bottom', duration: 3000});
                        setTimeout(() =>{
                            this.$router.push({
                                name: 'GoodList'/*,
                                 params: {
                                 indexPostData: this.postData
                                 }*/
                            });
                        },1000)
                    },(err) => {
                        this.$toast({message: err.msg, position: 'bottom', duration: 3000});
                    });
                }
            },
            checkPhoneNumber(phone) {
                let rex = /^1[3|4|5|7|8][0-9]\d{8}$/;
                phone = this.trimAll(phone);
                return !rex.test(phone);
            },
            trimAll(str) {
                str = str || "";
                str = str.replace(/\s+/g, "");
                return str;
            },
            fetchData() {
                let indexPostData = this.postData;
                if(indexPostData != undefined){
                    this.$store.commit('updatePostPrizesData',indexPostData);
                }
                this.$store.dispatch('fatchGoodsData').then((res) => {
                },(err) => {
                    this.$toast({message: err.msg, position: 'bottom', duration: 3000});
                });
            }
        },
        created(){
            //console.log(this.$route.params);
            this.fetchData()
        },
        mounted () { // 代替ready

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less" scoped>
    .goods{
        .goods_top{
            position: relative;
            margin: -10% 15px 22px;
            padding: 15px 0;
            border-radius: 15px;
            background: #fff;
            .goods_title{
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
            .goods_list{
                padding: 0 1.5%;
                text-align: center;
                .list_item{
                    width: 26%;
                    padding: 2%;
                    margin: 1.3%;
                    float: left;
                    border: 1px solid #eee;
                    border-radius: 15px;
                    .good_img{
                        position: relative;
                        .good_prizeName{
                            width: 100%;
                            position: absolute;
                            left: 0;
                            top: 50%;
                            height: 30px;
                            line-height: 30px;
                            font-size: 24px;
                            margin-top: -15px;
                            color: #fff;
                        }
                    }
                    &.active{
                        border-color: #38ba7e
                    }
                    .top{
                        margin-top: 5px;
                        font-size: 14px;
                        font-weight: 500;
                        color: #999;
                        line-height: 18px;
                    }
                    .bottom{
                        .nowPrice{
                            width: 50%;
                            float: left;
                            height: 21px;
                            line-height: 21px;
                            font-size: 12px;
                            font-weight: 700;
                        }
                        .oldPrice{
                            width: 50%;
                            float: left;
                            height: 21px;
                            line-height: 23px;
                            font-size: 10px;
                            color: #999;
                            text-decoration: line-through;
                        }
                    }
                }
            }
        }
        .phone_title{
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
        .goods_form{
            padding: 0 5%;
            .form_item{
                height: 44px;
                line-height: 44px;
                margin-bottom: 19px;
                input{
                    height: 100%;
                    border-radius: 5px;
                    border: 1px solid #999;
                    padding-left: 4%;
                    outline: 0
                }
                .phone_input{
                    width: 95%;
                    display: block
                }
                .code_inout{
                    width: 48%;
                    display: block;
                    float: left
                }
                .send_code{
                    width: 30%;
                    font-size: 16px;
                    color: #fff;
                    text-align: center;
                    border: 1px solid #38ba7e;
                    background: #38ba7e;
                    border-radius: 5px;
                    height: 100%;
                    float: right;
                    padding: 0 15px;
                    &.active{
                        border: 1px solid #ddd;
                        background: #ddd;
                        color: #fff
                    }
                }
            }
            .submit_order_btn{
                width: 70%;
                height: 50px;
                line-height: 50px;
                font-size: 22px;
                text-align: center;
                margin: 35px auto;
                border-radius: 50px;
                background: #ff6367;
                color: #fff
            }
        }
    }
</style>
