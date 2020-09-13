Vue.component('grocery-item', {
  props: ['item'],
  template: '<li>{{ item.text }} ({{item.amount}}) </li>',
});

var app = new Vue({
  el: '#app',
  data: {
    groceryList: [
      { id: 0, text: 'Pickles', amount: '1 jar' },
      { id: 1, text: 'Cheese', amount: '2 blocks' },
      { id: 2, text: 'Fish Crackers', amount: '1 bag' },
    ],
  },
});
