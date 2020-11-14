Vue.component('click-counter', {
    template: '#click-counter-template',
    // another way to define the template:
    // template: `<button @click="count++">{{ count }}</button>`
    data () {
      return {
        count: 0
      }
    },
  })
  
  new Vue({
    el: '#app'
  })