var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    seen: true,
    todos: [
      { text: 'code' },
      { text: 'eat' },
      { text: 'sleep' },
      { text: 'drink water' },
    ],
    newTodo: '',
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('');
      this.todos.reverse();
    },
    onSubmit() {
      this.todos.push({ text: this.newTodo });
      this.newTodo = '';
    },
  },
});

app.message = "Hello everyone! Let's be productive today!";
app.seen = false;
app.todos.push({ text: 'brush teeth' });
