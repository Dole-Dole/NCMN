"use strict";

new TypeIt(".home__title--strong", {
  loop: true,
  speed: 100,
})
  .move(-19)
  .pause(1000)
  .move(19)
  .delete()
  .go();
