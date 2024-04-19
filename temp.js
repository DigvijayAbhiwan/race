const fs = require("fs");

const horses = [
  { id: 1, speed: 50, position: 0, tiredness: 0, time: 0 },
  { id: 2, speed: 60, position: 0, tiredness: 0, time: 0 },
  { id: 3, speed: 52, position: 0, tiredness: 0, time: 0 },
  { id: 4, speed: 63, position: 0, tiredness: 0, time: 0 },
  { id: 5, speed: 57, position: 0, tiredness: 0, time: 0 },
  { id: 6, speed: 59, position: 0, tiredness: 0, time: 0 },
];

const raceTrackDistance = 400;
let raceData = [];
const MAX_TIREDNESS = 100;
const INJURY_PROBABILITY = 0.05;

const calculatePositions = (horse) => {
  if (Math.random() < INJURY_PROBABILITY) {
    return;
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
  const allHorseData = horses.map((horse) => {
    return {
      horseId: horse.id,
      position: horse.position,
      tiredness: horse.tiredness,
      time: horse.time,
      speed: horse.speed,
      injured: Math.random() < INJURY_PROBABILITY,
    };
  });
  raceData.push({ allHorseData });
};

const startRace = () => {
  let raceFinished = false;
  while (!raceFinished) {
    horses.forEach((horse) => {
      calculatePositions(horse);
      if (horse.tiredness >= MAX_TIREDNESS) {
        horse.speed = Math.max(1, horse.speed - Math.random() * 10);
      }
    });
    sendRaceData();
    raceFinished = horses.every((horse) => horse.position >= raceTrackDistance);
  }
  const winner = determineWinner();
  raceData.push({ winner });
  fs.writeFileSync("race_output.json", JSON.stringify(raceData, null, 2));
};

startRace();


// const fs = require("fs");

// const horses = [
//   { id: 1, speed: 50, position: 0, tiredness: 0, time: 0 },
//   { id: 2, speed: 60, position: 0, tiredness: 0, time: 0 },
//   { id: 3, speed: 52, position: 0, tiredness: 0, time: 0 },
//   { id: 4, speed: 63, position: 0, tiredness: 0, time: 0 },
//   { id: 5, speed: 57, position: 0, tiredness: 0, time: 0 },
//   { id: 6, speed: 59, position: 0, tiredness: 0, time: 0 },
// ];

// const raceTrackDistance = 400;
// let raceData = [];
// const MAX_TIREDNESS = 100;
// const INJURY_PROBABILITY = 0.05;

// const calculatePositions = (horse, injuryChance) => {
//   if (injuryChance < INJURY_PROBABILITY) {
//     return;
//   }

//   horse.tiredness += horse.speed;
//   const remainingDistance = raceTrackDistance - horse.position;
//   const distance = Math.min(
//     Math.abs(horse.speed * Math.random()),
//     remainingDistance
//   );
//   horse.position += distance;
//   horse.time += distance / horse.speed;

//   if (horse.position >= raceTrackDistance) {
//     horse.position = raceTrackDistance;
//   }
// };

// const determineWinner = () => {
//   let winner = null;
//   let minTime = Infinity;
//   horses.forEach((horse) => {
//     if (horse.position === raceTrackDistance && horse.time < minTime) {
//       minTime = horse.time;
//       winner = horse;
//     }
//   });
//   return winner;
// };

// const sendRaceData = () => {
//   const allHorseData = horses.map((horse) => {
//     return {
//       horseId: horse.id,
//       position: horse.position,
//       tiredness: horse.tiredness,
//       time: horse.time,
//       speed: horse.speed,
//       injured: Math.random() < INJURY_PROBABILITY,
//     };
//   });
//   raceData.push({ allHorseData });
// };

// const startRace = () => {
//   let raceFinished = false;
//   while (!raceFinished) {
//     const allHorseData = [];
//     horses.forEach((horse) => {
//       const injuryChance = Math.random();
//       calculatePositions(horse, injuryChance);
//       const injured = injuryChance < INJURY_PROBABILITY;
//       if (horse.tiredness >= MAX_TIREDNESS) {
//         horse.speed -= 1;
//       }
//       allHorseData.push({
//         horseId: horse.id,
//         position: horse.position,
//         tiredness: horse.tiredness,
//         time: horse.time,
//         speed: horse.speed,
//         injured,
//       });
//     });
//     raceData.push(allHorseData);
//     sendRaceData();
//     raceFinished = horses.every((horse) => horse.position >= raceTrackDistance);
//   }
//   const winner = determineWinner();
//   raceData.push({ winner });
//   fs.writeFileSync("race_output.json", JSON.stringify(raceData, null, 2));
// };

// startRace();

// const fs = require("fs");

// const horses = [
//   { id: 1, speed: 50, position: 0, tiredness: 0, time: 0 },
//   { id: 2, speed: 60, position: 0, tiredness: 0, time: 0 },
//   { id: 3, speed: 52, position: 0, tiredness: 0, time: 0 },
//   { id: 4, speed: 63, position: 0, tiredness: 0, time: 0 },
//   { id: 5, speed: 57, position: 0, tiredness: 0, time: 0 },
//   { id: 6, speed: 59, position: 0, tiredness: 0, time: 0 },
// ];

// const raceTrackDistance = 400;
// let raceData = [];
// const MAX_TIREDNESS = 100;
// const INJURY_PROBABILITY = 0.05;

// const calculatePositions = (horse) => {
//   if (Math.random() < INJURY_PROBABILITY) {
//     return;
//   }

//   horse.tiredness += horse.speed;
//   const remainingDistance = raceTrackDistance - horse.position;
//   const distance = Math.min(
//     Math.abs(horse.speed * Math.random()),
//     remainingDistance
//   );
//   horse.position += distance;
//   horse.time += distance / horse.speed;

//   if (horse.position >= raceTrackDistance) {
//     horse.position = raceTrackDistance;
//   }
// };

// const determineWinner = () => {
//   let winner = null;
//   let minTime = Infinity;
//   horses.forEach((horse) => {
//     if (horse.position === raceTrackDistance && horse.time < minTime) {
//       minTime = horse.time;
//       winner = horse;
//     }
//   });
//   return winner;
// };

// const startRace = () => {
//   let raceFinished = false;
//   while (!raceFinished) {
//     const raceStepData = {};
//     horses.forEach((horse) => {
//       calculatePositions(horse);
//       if (horse.tiredness >= MAX_TIREDNESS) {
//         horse.speed = Math.max(1, horse.speed - Math.random() * 10);
//       }
//       raceStepData[horse.id] = { ...horse };
//     });
//     raceData.push(raceStepData);
//     raceFinished = horses.every((horse) => horse.position >= raceTrackDistance);
//   }
//   const winner = determineWinner();
//   raceData.push({ winner });
//   fs.writeFileSync("race_output.json", JSON.stringify(raceData, null, 2));
// };

// startRace();

// const fs = require("fs");

// const horses = [
//   { id: 1, speed: 50, position: 0, tiredness: 0, time: 0 },
//   { id: 2, speed: 60, position: 0, tiredness: 0, time: 0 },
//   { id: 3, speed: 52, position: 0, tiredness: 0, time: 0 },
//   { id: 4, speed: 63, position: 0, tiredness: 0, time: 0 },
//   { id: 5, speed: 57, position: 0, tiredness: 0, time: 0 },
//   { id: 6, speed: 59, position: 0, tiredness: 0, time: 0 },
// ];

// const raceTrackDistance = 400;
// let raceData = {};
// const MAX_TIREDNESS = 100;
// const INJURY_PROBABILITY = 0.05;

// const calculatePositions = (horse) => {
//   if (Math.random() < INJURY_PROBABILITY) {
//     return;
//   }

//   horse.tiredness += horse.speed;
//   const remainingDistance = raceTrackDistance - horse.position;
//   const distance = Math.min(
//     Math.abs(horse.speed * Math.random()),
//     remainingDistance
//   );
//   horse.position += distance;
//   horse.time += distance / horse.speed;

//   if (horse.position >= raceTrackDistance) {
//     horse.position = raceTrackDistance;
//   }
// };

// const determineWinner = () => {
//   let winner = null;
//   let minTime = Infinity;
//   horses.forEach((horse) => {
//     if (horse.position === raceTrackDistance && horse.time < minTime) {
//       minTime = horse.time;
//       winner = horse;
//     }
//   });
//   return winner;
// };

// const startRace = () => {
//   let raceFinished = false;
//   while (!raceFinished) {
//     horses.forEach((horse) => {
//       calculatePositions(horse);
//       if (horse.tiredness >= MAX_TIREDNESS) {
//         horse.speed = Math.max(1, horse.speed - Math.random() * 10);
//       }
//       raceData[horse.id] = raceData[horse.id] || [];
//       raceData[horse.id].push({ ...horse });
//     });
//     raceFinished = horses.every((horse) => horse.position >= raceTrackDistance);
//   }
//   const winner = determineWinner();
//   raceData["winner"] = winner;
//   fs.writeFileSync("race_output.json", JSON.stringify(raceData, null, 2));
// };

// startRace();

// const fs = require("fs");

// const horses = [
//   { id: 1, speed: 50, position: 0, tiredness: 0, time: 0 },
//   { id: 2, speed: 60, position: 0, tiredness: 0, time: 0 },
//   { id: 3, speed: 52, position: 0, tiredness: 0, time: 0 },
//   { id: 4, speed: 63, position: 0, tiredness: 0, time: 0 },
//   { id: 5, speed: 57, position: 0, tiredness: 0, time: 0 },
//   { id: 6, speed: 59, position: 0, tiredness: 0, time: 0 },
// ];

// const raceTrackDistance = 400;
// let raceData = [];
// const MAX_TIREDNESS = 100;
// const INJURY_PROBABILITY = 0.05;
// const HEALING_FACTOR = 0.1; // New constant for healing factor

// const calculatePositions = (horse) => {
//   if (Math.random() < INJURY_PROBABILITY) {
//     horse.speed *= 1 - HEALING_FACTOR; // Reduce speed due to injury
//   } else {
//     horse.speed *= 1 + HEALING_FACTOR; // Increase speed due to healing
//   }

//   horse.tiredness += horse.speed;
//   const remainingDistance = raceTrackDistance - horse.position;
//   const distance = Math.min(
//     Math.abs(horse.speed * Math.random()),
//     remainingDistance
//   );
//   horse.position += distance;
//   horse.time += distance / horse.speed;

//   if (horse.position >= raceTrackDistance) {
//     horse.position = raceTrackDistance;
//   }
// };

// const determineWinner = () => {
//   let winner = null;
//   let minTime = Infinity;
//   horses.forEach((horse) => {
//     if (horse.position === raceTrackDistance && horse.time < minTime) {
//       minTime = horse.time;
//       winner = horse;
//     }
//   });
//   return winner;
// };

// const sendRaceData = () => {
//   const allHorseData = horses.map((horse) => {
//     return {
//       horseId: horse.id,
//       position: horse.position,
//       tiredness: horse.tiredness,
//       time: horse.time,
//       speed: horse.speed,
//       injured: Math.random() < INJURY_PROBABILITY,
//     };
//   });
//   raceData.push({ allHorseData });
// };

// const startRace = () => {
//   let raceFinished = false;
//   while (!raceFinished) {
//     horses.forEach((horse) => {
//       calculatePositions(horse);
//       if (horse.tiredness >= MAX_TIREDNESS) {
//         horse.speed = Math.max(1, horse.speed - Math.random() * 10);
//       }
//     });
//     sendRaceData();
//     raceFinished = horses.every((horse) => horse.position >= raceTrackDistance);
//   }
//   const winner = determineWinner();
//   raceData.push({ winner });
//   fs.writeFileSync("race_output.json", JSON.stringify(raceData, null, 2));
// };

// startRace();