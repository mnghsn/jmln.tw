(function () {
  'use strict';

  Array.prototype.forEach.call(document.querySelectorAll('.js-emoji'), function (emoji) {
    twemoji.parse(emoji);
  });

})();
