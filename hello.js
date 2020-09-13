var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    seen: false,
    todos: [
      { text: 'code' },
      { text: 'eat' },
      { text: 'sleep' },
      { text: 'drink water' },
    ],
    note: '',
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('');
    },
  },
});

app.message = 'Hello to everyone!';
app.seen = true;
app.todos.push({ text: 'brush teeth' });
