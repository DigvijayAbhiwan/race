const fs = require("fs");

const horses = [
  { id: 1, speed: 50, position: 0, tiredness: 0, time: 0, maxSpeed: 50 },
  { id: 2, speed: 60, position: 0, tiredness: 0, time: 0, maxSpeed: 60 },
  { id: 3, speed: 52, position: 0, tiredness: 0, time: 0, maxSpeed: 52 },
  { id: 4, speed: 63, position: 0, tiredness: 0, time: 0, maxSpeed: 63 },
  { id: 5, speed: 57, position: 0, tiredness: 0, time: 0, maxSpeed: 57 },
  { id: 6, speed: 59, position: 0, tiredness: 0, time: 0, maxSpeed: 59 },
];

const raceTrackDistance = 400;
let raceData = {};
const MAX_TIREDNESS = 100;
const INJURY_PROBABILITY = 0.05;
const HEALING_FACTOR = 0.1;
const MIN_SPEED = 10;

const calculatePositions = (horse) => {
  if (Math.random() < INJURY_PROBABILITY) {
    horse.speed *= 1 - HEALING_FACTOR;
  } else {
    horse.speed = Math.min(horse.maxSpeed, horse.speed * (1 + HEALING_FACTOR));
  }

  horse.tiredness += horse.speed;
  const remainingDistance = raceTrackDistance - horse.position;
  const distance = Math.min(
    Math.abs(horse.speed * Math.random()),
    remainingDistance
  );
  horse.position += distance;
  horse.time += distance / horse.speed;

  if (horse.position >= raceTrackDistance) {
    horse.position = raceTrackDistance;
  }
};

const determineWinner = () => {
  let winner = null;
  let minTime = Infinity;
  horses.forEach((horse) => {
    if (horse.position === raceTrackDistance && horse.time < minTime) {
      minTime = horse.time;
      winner = horse;
    }
  });
  return winner;
};

const sendRaceData = () => {
  horses.forEach((horse) => {
    if (!raceData[horse.id]) {
      raceData[horse.id] = [];
    }
    raceData[horse.id].push({
      position: horse.position,
      tiredness: horse.tiredness,
      time: horse.time,
      speed: horse.speed,
      injured: Math.random() < INJURY_PROBABILITY,
    });
  });
};

const startRace = () => {
  let raceFinished = false;
  while (!raceFinished) {
    horses.forEach((horse) => {
      calculatePositions(horse);
      if (horse.tiredness >= MAX_TIREDNESS) {
        horse.speed = Math.max(MIN_SPEED, horse.speed - Math.random() * 10);
      }
    });
    sendRaceData();
    raceFinished = horses.every((horse) => horse.position >= raceTrackDistance);
  }
  const winner = determineWinner();
  raceData["winner"] = winner;
  console.log(winner);
  fs.writeFileSync("race_output.json", JSON.stringify(raceData, null, 2));
};

startRace();
