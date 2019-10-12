// import $ from 'jquery';
// import './css/index.css'
// import './css/index.less'
import './css/index.scss'
import './css/iconfont.css'
// $(function () {
//   $('li:odd').css('backgroundColor', 'orange');
//   $('li:even').css('backgroundColor', 'lightgreen');
// })

//传统方式实现构造函数
function Boy(name,age){
    this.name=name;
    this.age=age;
}
Boy.interest='toy';
var boy=new Boy('邹宇峰',5);

// ES6 实现类和构造函数
class Child{
    // 使用 static 关键字，可以定义静态属性
    static info={name:'邹宇峰',age:5}
}
var boy=new Child('邹宇峰',5);