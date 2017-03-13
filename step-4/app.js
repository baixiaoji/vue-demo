import Vue from 'vue'
import AV from "leancloud-storage"

// leancloud的初始化配置
var APP_ID = '0zDsf0Lx4sGM8ObOzD9cXRfO-gzGzoHsz';
var APP_KEY = 'vMPiwrUv0nUd8LB4SYWQiOLM';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});



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
    todoList: [],
    currentUser: null
  },
  created: function () {
    this.currentUser = this.getCurrentUser();
    if (this.currentUser) {
      var query = new AV.Query("AllTodos")
      query.find()
        .then(function(todos){
          console.log(todos)
        },function(err){
          console.log(err)
        })
    }
  },
  methods: {
    saveTodos: function () {
      let dataString = JSON.stringify(this.todoList)
      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();
      var acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setWriteAccess(AV.User.current(), true);

      avTodos.set('content', dataString);
      avTodos.setACL(acl); // 设置访问控制
      avTodos.save().then(function (todo) {
        // 成功保存之后，执行其他逻辑.
        console.log("保存成功");
      }, function (error) {
        // 异常处理
        console.error("保存失败");
      });
    },
    addTodo: function () {
      this.todoList.push({
        title: this.newTodo,
        date: (new Date()).toLocaleDateString(),
        done: false
      })
      //  console.log( this.todoList )
      this.newTodo = " ";
      this.saveTodos()
    },
    removeTodo: function (todo) {
      let index = this.todoList.indexOf(todo);
      this.todoList.splice(index, 1)
      console.log(index)
      this.saveTodos();
    },
    signUp: function () {
      var user = new AV.User();
      // 设置用户名
      user.setUsername(this.formData.username);
      // 设置密码
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser) => {
        this.currentUser = this.getCurrentUser();
      }, function (error) {
        console.log("注册失败")
      });
    },
    login: function () {
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
        this.currentUser = this.getCurrentUser();
      }, function (error) {
        console.log("登录失败")
      });
    },
    getCurrentUser: function () {
      let current = AV.User.current();
      if (current) {
        let { id, createdAt, attributes: { username } } = AV.User.current();
        return { id, username, createdAt }
      } else {
        return null
      }
    },
    logout: function () {
      AV.User.logOut();
      this.currentUser = null
      window.location.reload()
    }
  }
})

