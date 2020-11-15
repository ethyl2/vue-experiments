Vue.component('todo-item', {
    template: '#todo-item-template',
    data () {
      return {
        isCompleted: false,
        isHighlighted: false
      }
    },
    methods: {
        handleButtonClick() {
            this.isHighlighted = !this.isHighlighted
        }
    }
  })

  Vue.component('page-layout', {
      template: '#page-layout-template'
  })
  
  new Vue({
    el: '#app'
  })