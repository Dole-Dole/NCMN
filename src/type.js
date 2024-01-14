"use strict";

new TypeIt(".home__title--strong", {
  loop: true,
  speed: 100,
})
  .move(-18)
  .pause(1000)
  .move(18)
  .delete()
  .go();
