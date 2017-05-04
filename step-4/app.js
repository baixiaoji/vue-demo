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
    allTodo:[],
    currentUser: null,
  },
  computed: {
     todoCount: function(){
        return this.todoList.length
     }
  },
  created: function () {
    this.currentUser = this.getCurrentUser();
    this.fetchTodos()
  },
  methods: {
    fetchTodos: function () {
      if (this.currentUser) {
        var query = new AV.Query("AllTodos")
        query.find()
          .then((todos) => {
            let avAllTodos = todos[0]
            let id = avAllTodos.id
            //
            this.allTodo = this.todoList = JSON.parse(avAllTodos.attributes.content)
            this.todoList.id = id;

          }, function (err) {
            console.log(err)
          })
      }

      
    },
    updateTodos: function () {
      let dataString = JSON.stringify(this.todoList)
      let avTodos = AV.Object.createWithoutData("AllTodos", this.todoList.id)
      avTodos.set('content', dataString)
      avTodos.save().then(() => {
        console.log("update")
      })
    },
    saveTodos: function () {
      let dataString = JSON.stringify(this.todoList)
      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();
      var acl = new AV.ACL();
      acl.setReadAccess(AV.User.current(), true);
      acl.setWriteAccess(AV.User.current(), true);

      avTodos.set('AllTodos', dataString);
      avTodos.setACL(acl); // 设置访问控制
      avTodos.save().then((todo) => {
        this.todoList.id = todo.id
        // 成功保存之后，执行其他逻辑.
        console.log("保存成功");
      }, function (error) {
        // 异常处理
        console.error("保存失败");
      });
    },
    saveOrUpdateTodos: function () {
      if (this.todoList.id) {
        this.updateTodos()
      } else {
        this.saveTodos()
      }
    },
    addTodo: function () {
      this.todoList.push({
        title: this.newTodo,
        date: (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
        done: false
      })
      //  console.log( this.todoList )
      this.newTodo = " ";
      this.saveOrUpdateTodos()
    },
    removeTodo: function (todo) {
      let index = this.todoList.indexOf(todo);
      let removeTodo = this.todoList.splice(index, 1)
      this.saveOrUpdateTodos();
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
        this.fetchTodos()
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
    },
    finish: function(todo){
      todo.done = true;
      this.allTodo = this.todoList
      // this.saveOrUpdateTodos();
    },
    showAll: function(e){
      let li = e.target
      let lis = li.parentElement.children;
      this.removeClass(lis)
      this.addClass(li)

      this.todoList = this.allTodo
    },
    showDoing: function(e){
      let doingTodo = this.todoList.filter((todo)=>todo.done===false) || this.allTodo.filter((todo)=>todo.done===false)
      if(doingTodo.length > 0){
          this.todoList = doingTodo
      }else{
        alert("没有进行的")
        return
      }
      
      let li = e.target
      let lis = li.parentElement.children;
      this.removeClass(lis)
      this.addClass(li)
    },
    showFinish: function(e){
      // 这里判断要根据length判断  因为空数组也是true
      let finishTodo = this.todoList.filter((todo)=>todo.done===true) || this.allTodo.filter((todo)=>todo.done===true)
      console.log(finishTodo)
      if(finishTodo.length > 0){
          this.todoList = finishTodo
      }else{
        alert("没有完成的")
        return
      }

      let li = e.target
      let lis = li.parentElement.children;
      this.removeClass(lis)
      this.addClass(li)
    },
    addClass(li){
      if(!li.className.match("active")){
          li.classList.add("active")
      }
    },
    removeClass(arr){
      for(let i = 0; i<arr.length; i++){
        arr[i].classList.remove("active")
      }
    }
  }
})

