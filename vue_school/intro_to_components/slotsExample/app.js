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
  
  new Vue({
    el: '#app'
  })