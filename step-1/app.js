import bar from './bar';
import Vue from 'vue'

bar();

var app = new Vue({
  el: '#app', // 页面元素 可类和ID  但是如果类出现两次，第二次不会操作DOM上去
  data: {
    message: '你好!',
    text: '白小霁',
    time:1
  },
  /*
    实例的生命周期 钩子   细看 https://cn.vuejs.org/v2/guide/instance.html#生命周期图示
    created 在实例被创建之后被调用
    在要去渲染页面之前
    这里的 this 指向的就是调用它的Vue实例
   */
  created:function(){
    //   console.log(this.message, this.text )
    this.message = "Hi！"
    this.time =  new Date() 
  },
  /*在要去渲染页面之前 */
  mounted:function(){
      console.log("我要mounted")
      this.text = "zouzou"
      this.time = new Date() - this.time;
      console.log(this.time)
  },
  /*见下面的 input 部分 */
  updated: function(){
      console.log("我updated过")
  },
  /*未知 */
  destroyed:function(){
      console.log("我做完了")
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
  },
  /* 在数据更新的时候触发*/
   updated: function(){
      console.log(this.message)
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
var vm = new Vue({
  el: '#example-1',
  data: {
    message: 'Hello'
  },
  //有些需要计算得出来的属性放在 computed 里面  
  // 看 https://cn.vuejs.org/v2/guide/computed.html#基础例子
  /*
    computed 有缓存  而  methods里的方法会不会的调用
   */
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
      reverseMessage:function(){
          return this.message.split('').reverse().join('')
      }
  }
})

// var vm = new Vue({
//   el: '#demo',
//   data: {
//     firstName: 'Foo',
//     lastName: 'Bar',
//     fullName: 'Foo Bar'
//   },
//   watch: {
//     firstName: function (val) {
//       this.fullName = val + ' ' + this.lastName
//     },
//     lastName: function (val) {
//       this.fullName = this.firstName + ' ' + val
//     }
//   }
// })
// 同样的实现  计算属性可能更好
// var vm = new Vue({
//   el: '#demo',
//   data: {
//     firstName: 'Foo',
//     lastName: 'Bar'
//   },
//   computed: {
//     fullName: function () {
//       return this.firstName + ' ' + this.lastName
//     }
//   }
// })

var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: {
        // getter
        get: function () {
            return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
            var names = newValue.split(' ')
            this.firstName = names[0]
            this.lastName = names[names.length - 1]
        }
    }
 }
})
// 计算属性 默认只有 getter 如果你要在某处改变他的值的话  
// 你需要在计算属性中给他一个 setter
// vm.fullName = 'John Doe'
var app9 = new Vue({
    el: '#app-9',
    // data: {
    //     isActive: true,
    //     hasError: false
    // }
    //改写成
    data: {
        classObject: {
            active: true,
            'text-danger': false
        }
    }
})
var app10 = new Vue({
    el: '#app-10',
    data: {
        loginType: 'username'
    },
    methods: {
        changeLoginType: function(){
            if(this.loginType === 'username'){
                this.loginType = 'aa'
            }else{
                this.loginType = 'username'
            }
            
        }
    }
})
var example1 = new Vue({
  el: '#example-2',
  data: {
    items: [
      {message: 'Foo' },
      {message: 'Bar' }
    ]
  }
})
var example2 = new Vue({
  el: '#example-3',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
// v-for 可以通过一个对象属性来迭代
new Vue({
  el: '#repeat-object',
  data: {
    object: {
      FirstName: 'John',
      LastName: 'Doe',
      Age: 30
    }
  }
})
new Vue({
    el: "#one"
})
new Vue({
  el: '#example-4',
  data: {
    counter: 0
  }
})

var example2 = new Vue({
  el: '#example-5',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      alert(event.target.tagName)
    }
  }
})

// 注册
Vue.component('my-component', {
  template: '<div>你好咯！！</div>'
})
// 创建根实例
new Vue({
  el: '#example-6'
})
// 组件当中的 data 必须是函数
var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // data 是一个函数，因此 Vue 不会警告，
  // 但是我们为每一个组件返回了同一个对象引用
  data: function () {
    return {
        counter : 0
    }
  }
})
new Vue({
  el: '#example-7'
})
// 自定义事件
// 
Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})