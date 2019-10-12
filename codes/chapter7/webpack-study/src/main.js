
import Vue from 'vue'  //方法3
// import Vue from '../node_modules/vue/dist/vue' //方法2
// import logo from './logo.vue'
import authorInfo from './authorInfo.vue'

var vm = new Vue({
    el: '#app',
    //去掉不必要的括号
    // render:r=>r(authorInfo),
    // render:function(cel){
    //   return cel(authorInfo);
    //  },
    //lambda表达式
    render:(cel)=>{ return cel(logo);},
    // components:{
    //   logo
    // },
    data: {
      msg: '你打不过我吧，沒有办法，我就是这么强大'
    }
})