import bar from './bar';
import Vue from 'vue'

bar();

var app = new Vue({
  el: '#app', // 页面元素 可类和ID  但是如果类出现两次，第二次不会操作DOM上去
  data: {
    message: '你好!',
    text: '白小霁'
  }
})

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: `你在 ${new Date()}的时候加载了页面`
  }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: false
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' },
       { text: 'vue还能for循环' }
    ]
  }
})
// app4.todos.push({ text: '新的' })

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: '我爱你'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

var app6 = new Vue({
  el: '#app-6',
  data: {
    message: '你可以在下面的input改我的值'
  }
})


//这里开始有点绕了 
// 主要作用是将父作用域的数据 传到 子作用域 那在定义组件的时候就就要让他接受一个 props 字段
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { text: 'Vegetables' },
      { text: 'Cheese' },
      { text: 'Whatever else humans are supposed to eat' }
    ]
  }
})

//  在定义完组件的时候，记得要创建 根实例
Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})
// 要创建 根实例 🔥🔥
new Vue({
  el: '#app-8'
})

var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
console.log(`原先的a是${data.a}`)
console.log(vm.$data === data )  // -> true
console.log( vm.$el === document.getElementById('example') )// -> true
data.a = 4;
console.log(`现在的a是${vm.a}`)
vm.a = 5;
// $watch 是一个实例方法 没测出这个$watch什么时候调用
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
  console.log(newVal,oldVal)
  console.log("我变了")
})