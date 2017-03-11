import bar from './bar';
import Vue from 'vue'

bar();

var app = new Vue({
  el: '#app', // 页面元素 可类和ID  但是如果类出现两次，第二次不会操作DOM上去
  data: {
    newTodo: '',
    todoList:[]
  },
  methods:{
    addTodo: function(){
      this.todoList.push({
        title: this.newTodo,
        createAt: ( new Date() ).toLocaleString(),
        done: false
      })
      this.newTodo = " ";
    },
    removeTodo: function(todo){
      // Array.prototype.indexOf 是 ES 5 新加的 API
      let index = this.todoList.indexOf( todo );
      this.todoList.splice(index,1)
    } 
  }
})

