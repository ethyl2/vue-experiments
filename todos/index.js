Vue.component('todo-item', {
  props: {
    text: {
      type: String,
    },
  },
  template: '<li>{{ text }}</li>',
});

var app = new Vue({
  el: '#app',
});
