Vue.component('todo-item', {
    template: '#todo-item-template',
    data () {
      return {
        isCompleted: false
      }
    }
  })
  
  new Vue({
    el: '#app'
  })