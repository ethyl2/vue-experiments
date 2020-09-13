'use strict';

// emojify returns the corresponding emoji image
function emojify(name) {
  var out = `<img src="emojis/` + name + `.png">`;
  return out;
}

var app = new Vue({
  el: '#app',
  data: {
    wizard: '',
    harry: emojify('harry'),
    hedwig: emojify('hedwig'),
    ron: emojify('ron'),
    scabbers: emojify('scabbers'),
    hermione: emojify('hermione'),
    crookshanks: emojify('crookshanks'),
  },
  methods: {
    wizards: function () {
      return [
        { name: this.harry, pet: this.hedwig },
        { name: this.ron, pet: this.scabbers },
        { name: this.hermione, pet: this.crookshanks },
      ];
    },
  },
});

app.wizard = app.hermione;
