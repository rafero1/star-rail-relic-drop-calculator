import {
  calculateNewSubstatProbability,
  relicProbabilityGivenNumberOfRuns,
  relicRunsGivenProbability,
} from "./relicMath.js";
import { MAX_DAILY_RUNS } from "./constants.js";

function experimentNewSub(experimentData) {
  experimentData.forEach((calc) => {
    const { mainStat, has, wants } = calc;
    const prob = calculateNewSubstatProbability(mainStat, has, wants);
    console.log(
      `want: ${calc.wants}, has: ${calc.has.join(" / ")} = `,
      prob.toFixed(5) * 100,
      "%"
    );
  });
}

function experimentDomainRun(experimentData) {
  experimentData.forEach((calc) => {
    const results = relicProbabilityGivenNumberOfRuns(
      calc.slot,
      calc.mainStat,
      calc.substats,
      calc.runs
    );

    console.log(
      `at least 1 ${calc.mainStat} ${calc.slot} with ${
        calc.substats === undefined || calc.substats.length == 0
          ? "any"
          : calc.substats.join(" / ")
      } subs in ${calc.runs} runs = ${
        results.finalProbability.toFixed(5) * 100
      }% (${results.stamCost} stamina)`
    );
  });
}

function experimentNumberOfRuns(experimentData) {
  experimentData.forEach((calc) => {
    const results = relicRunsGivenProbability(
      calc.slot,
      calc.mainStat,
      calc.substats,
      calc.targetProbability
    );

    console.log(
      `at least 1 ${calc.mainStat} ${calc.slot} with ${
        calc.substats === undefined || calc.substats.length == 0
          ? "any"
          : calc.substats.join(" / ")
      } subs with ${calc.targetProbability.toFixed(5) * 100}% probability = ${
        results.runs
      } runs (${results.staminaCost} stamina, or ${
        results.staminaCost / MAX_DAILY_RUNS
      } days)`
    );
  });
}

// experimentNewSub([
//   { mainStat: "atk", has: ["cd"], wants: "spd" },
//   { mainStat: "atk", has: ["spd"], wants: "cd" },
// ]);

experimentDomainRun([
  {
    slot: "head",
    mainStat: "rhp",
    substats: ["hp", "def"],
    runs: MAX_DAILY_RUNS,
  },
  // {
  //   slot: "chest",
  //   mainStat: "atk",
  //   substats: ["cr", "cd"],
  //   runs: MAX_DAILY_RUNS,
  // },
  // {
  //   slot: "chest",
  //   mainStat: "cd",
  //   substats: ["cr", "atk"],
  //   runs: MAX_DAILY_RUNS,
  // },
  // {
  //   slot: "chest",
  //   mainStat: "cd",
  //   substats: ["cr", "atk", "spd"],
  //   runs: MAX_DAILY_RUNS * 7,
  // },
]);

experimentNumberOfRuns([
  {
    slot: "head",
    mainStat: "rhp",
    substats: ["hp", "def"],
    targetProbability: 0.75,
  },
]);
