const fs = require('fs');

const { questions, speakers } = require('./data/gameData.ts');

// We need to parse gameData.ts, or just re-define the logic here since we can't easily require ts without ts-node
// I'll re-define the necessary parts of gameData.ts

const BUILDERS = ["mohit_tyagi_arch", "jayant_arch", "ranveer_arch"];
const DISRUPTORS = ["nikhil_arch", "kritika_arch", "aman_arch"];
const THINKERS = ["manasa_arch", "vidya_arch", "shruti_arch", "will_arch"];
const COMMUNICATORS = ["mithoon_arch", "vijendar_arch", "shashi_arch"];

const optionsList = [
  [DISRUPTORS, [...BUILDERS, ...THINKERS], COMMUNICATORS, [...COMMUNICATORS, ...DISRUPTORS]],
  [DISRUPTORS, THINKERS, BUILDERS, COMMUNICATORS],
  [DISRUPTORS, BUILDERS, [...THINKERS, ...COMMUNICATORS], COMMUNICATORS],
  [[...DISRUPTORS, ...THINKERS], BUILDERS, THINKERS, [...COMMUNICATORS, ...BUILDERS]],
  [DISRUPTORS, THINKERS, BUILDERS, COMMUNICATORS],
  [[...DISRUPTORS, ...THINKERS], BUILDERS, THINKERS, COMMUNICATORS],
  [BUILDERS, THINKERS, COMMUNICATORS, DISRUPTORS],
  [BUILDERS, THINKERS, [...COMMUNICATORS, ...DISRUPTORS], DISRUPTORS],
  [DISRUPTORS, THINKERS, COMMUNICATORS, BUILDERS],
  [BUILDERS, THINKERS, COMMUNICATORS, DISRUPTORS]
];

let speakerCounts = {};

for (let i = 0; i < 10000; i++) {
  let scores = {};
  for (let q = 0; q < optionsList.length; q++) {
    const opts = optionsList[q];
    const picked = opts[Math.floor(Math.random() * opts.length)];
    picked.forEach(id => {
      scores[id] = (scores[id] || 0) + 1;
    });
  }

  let maxScore = -1;
  let topArchetypeIds = [];

  Object.entries(scores).forEach(([id, score]) => {
    if (score > maxScore) {
      maxScore = score;
      topArchetypeIds = [id];
    } else if (score === maxScore) {
      topArchetypeIds.push(id);
    }
  });

  const winningArchetypeId = topArchetypeIds[Math.floor(Math.random() * topArchetypeIds.length)];
  speakerCounts[winningArchetypeId] = (speakerCounts[winningArchetypeId] || 0) + 1;
}

console.log(speakerCounts);
console.log("Total unique speakers hit:", Object.keys(speakerCounts).length);
