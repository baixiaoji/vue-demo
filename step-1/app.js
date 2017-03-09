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