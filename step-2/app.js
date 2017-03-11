import bar from './bar';
import Vue from 'vue'

bar();

var app = new Vue({
  el: '#app', // 页面元素 可类和ID  但是如果类出现两次，第二次不会操作DOM上去
  data: {
    newTodo: '',
    todoList:[]
  },
  created:function(){
    let i = 1;
    setInterval(() => {
      this.newTodo = i;
      i++;
    },1000)
  }
})

