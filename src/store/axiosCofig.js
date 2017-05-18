/**
 * Created by ex-fanwei001 on 2017-05-15.
 */
let veg = 'debug';
let api = 'http://test1-pawfhd.pingan.com.cn/pawf-nop/rest/flowCrowdFunding/';

if(veg == 'debug'){
    api = 'http://test1-pawfhd.pingan.com.cn:31080/pawf-nop/rest/flowCrowdFunding/';
}else if(veg == 'debugDK'){
    api = 'http://test1-pawfhd.pingan.com.cn/pawf-nop/rest/flowCrowdFunding/';
}else {
    api = 'https://pawfhd.pingan.com.cn/pawf-nop/rest/flowCrowdFunding/';
}


export default {
    api
}
