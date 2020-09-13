'use strict';

// emojify returns the corresponding emoji image
function emojify(name) {
  var out = `<img src="emojis/` + name + `.png">`;
  return out;
}

var app = new Vue({
  el: '#app',
  data: {
    message: 'hello, world!',
    submessage: 'how are you today?',
    emojiMessage: 'hopefully doing well' + emojify('pig'),
    response: '',
  },
});
