import { Howl } from "howler";

const successDing = new Howl({
  src: ["ping.mp3"],
  volume: 0.8,
});

const failureDrum = new Howl({
  src: ["drum.mp3"],
  volume: 0.6,
});

const successFanfare = new Howl({
  src: ["fanfare.mp3"],
  volume: 0.3,
});

const openCard = new Howl({
  src: ["cardPlace1.ogg"],
  volume: 0.6,
});

export { successDing, failureDrum, successFanfare, openCard };
