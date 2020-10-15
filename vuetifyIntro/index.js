import Playground from './Playground';

Vue.component('playground', Playground);

new Vue({
  el: '#app',
  vuetify: new Vuetify({}),
  data: {
    message: 'Using Single File Components',
  },
});
