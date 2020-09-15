'use strict';

// emojify returns the corresponding emoji image
function emojify(name) {
  var out = `<img src="../emojis/` + name + `.png">`;
  return out;
}

var app = new Vue({
  el: '#app',
  data: {
    active: emojify('sirius--man'),
    // sirius is an object that contains two states: man and dog
    sirius: {
      man: emojify('sirius--man'),
      dog: emojify('sirius--dog'),
    },
    quotes: {
      man: [
        "We've all got both light and dark inside us. What matters is the part we choose to act on. That's who we really are. -- HP & the Order of the Phoenix",
        'If you want to know what a man’s like, take a good look at how he treats his inferiors, not his equals. -- HP & the Goblet of Fire',
        "This is how it is — this is why you're not in the Order — you don't understand — there are things worth dying for! -- HP & the Order of the Phoenix",
        'You think the dead we loved ever truly leave us? -- HP & the Prisoner of Azkaban',
      ],
      dog: ['Ruff!', 'Bow wow!', 'snarl', '(whimper)'],
    },
  },
  methods: {
    // an animagus is a wizard whom can shapeshift
    animagus: function () {
      this.active =
        this.active == this.sirius.man ? this.sirius.dog : this.sirius.man;
    },
    // breathe returns the corresponding .breathe--*
    breathe: function () {
      return this.active == this.sirius.man ? 'breathe--man' : 'breathe--dog';
    },
    // background returns the corresponding background
    background: function () {
      return this.active == this.sirius.man ? '' : 'black';
    },
    noise: function () {
      return this.active == this.sirius.man
        ? this.quotes.man[Math.floor(Math.random() * this.quotes.man.length)]
        : this.quotes.dog[Math.floor(Math.random() * this.quotes.dog.length)];
    },
  },
});
