import Vue from 'vue'
import Router from 'vue-router'



import Index from '../page/index'
import Goods from '../page/goods'
import GoodList from '../page/good_list'
import Pay_success from '../page/pay_success'
import Err from '../page/err'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/vue_growd_funding/dist/',
            name: 'Index',
            component: Index
        },{
            path: '/vue_growd_funding/dist/goods',
            name: 'Goods',
            component: Goods
        },{
            path: '/vue_growd_funding/dist/goodList',
            name: 'GoodList',
            component: GoodList
        },{
            path: '/vue_growd_funding/dist/pay_success',
            name: 'Pay_success',
            component: Pay_success
        },{
            path: '/*',
            name: 'Err',
            component: Err
        }
    ]
})
