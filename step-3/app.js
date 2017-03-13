import Vue from 'vue'
import AV from "leancloud-storage"

// leancloud的初始化配置
var APP_ID = '0zDsf0Lx4sGM8ObOzD9cXRfO-gzGzoHsz';
var APP_KEY = 'vMPiwrUv0nUd8LB4SYWQiOLM';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
// 验证本地网络是否可以访问 LeanCloud 服务器
var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})


var app = new Vue({
  el: '#app', // 页面元素 可类和ID  但是如果类出现两次，第二次不会操作DOM上去
  data: {
    //切换注册登录数据源
    actionType: 'signUp',
    formData: {
      username: "",
      password: ""
    },
    newTodo: '',
    todoList:[]
  },
  created: function(){
   
    window.onbeforeunload  = () => {
       let dataString = JSON.stringify(this.todoList) 
       window.localStorage.setItem('myTodos', dataString) 
    }

    let oldDataString = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDataString)
    this.todoList = oldData || []
  },
  methods:{
   addTodo: function(){
     this.todoList.push({
       title: this.newTodo,
       date: (new Date()).toLocaleDateString(),
       done: false
     })
    //  console.log( this.todoList )
     this.newTodo = " ";
   },
   removeTodo: function(todo){
      let index = this.todoList.indexOf(todo);
      this.todoList.splice(index,1)
      console.log(index)
   }
  },
  signUp: function(){
    console.log("666")
  }
})

