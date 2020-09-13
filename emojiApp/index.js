'use strict';

// emojify returns the corresponding emoji image
function emojify(name) {
  var out = `<img src="emojis/` + name + `.png">`;
  return out;
}

// cast returns a spell (function) that decorates the wizard
function cast(emoji) {
  if (!emoji) {
    emoji = '¯\\_(ツ)_/¯';
  }
  return function (wizard) {
    return emoji + wizard + emoji;
  };
}

var app = new Vue({
  el: '#app',
  data: {
    message: 'hello, world!',
    submessage: 'how are you today?',
    emojiMessage: 'hopefully doing well' + emojify('pig'),
    response: '',
    wizard: emojify('wizard'),
  },
  methods: {
    lumos: cast(emojify('candle')),
    incendio: cast(emojify('fire')),
  },
});
