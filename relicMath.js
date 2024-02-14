import {
  MAINSTAT_PROBABILITY_TABLE,
  SUBSTAT_PROBABILITY_TABLE,
  MAX_SUBSTATS,
  RUN_STAMINA_COST,
  RUN_RELIC_AMOUNT_PROBABILITY_TABLE,
  DESIRABLE_SET_PROBABILITY,
  SU_SLOTS_PROBABILITY_TABLE,
  CAVERN_SLOTS_PROBABILITY_TABLE,
} from "./constants.js";

import { atLeastOneSuccess, combinations, normalize } from "./math.js";

/**
 * Remove certain keys from an object.
 */
const removeKeys = (obj, excludedKeys) => {
  const newObj = { ...obj };
  for (let key of excludedKeys) {
    delete newObj[key];
  }
  return newObj;
};

/**
 * Calculate the probability of a gold relic rolling a new substat, given its main stat and current substats.
 * The formula is the weight of the new substat divided by the sum of the weights of all possible substat candidates.
 * Substat candidates are all substats except the main stat and the current substats.
 * @param {string} mainStat - The main stat of the relic
 * @param {string[]} substats - The substats of the relic. Must be an array of up to 3 unique substats and different from the main stat.
 * @param {string} desiredSubstat - The desired substat to roll
 * @returns The probability of rolling the desired substat.
 */
const calculateNewSubstatProbability = (mainStat, substats, desiredSubstat) =>
  normalize(removeKeys(SUBSTAT_PROBABILITY_TABLE, [...substats, mainStat]))[
    desiredSubstat
  ];

/**
 * Calculate the probability of a certain gold relic rolling a certain main stat and substats combination.
 * @param {string} slot - The desired slot of the relic
 * @param {string} mainStat - The desired main stat of the relic
 * @param {string[]} substats - The desired substats of the relic. Must be an array of up to 4 unique substats and different from the main stat.
 */
const calculateGoldRelicProbability = (slot, mainStat, substats) => {
  if (substats.length > MAX_SUBSTATS) {
    throw new Error("A relic must have at most 4 substats");
  }
  if (substats.includes(mainStat)) {
    throw new Error("A relic cannot have the same substat as the main stat");
  }
  if (substats.length !== new Set(substats).size) {
    throw new Error("A relic cannot have the same substat twice");
  }

  // First calculate the probability of the main stat being rolled, which is independent of the substats.
  let probability = normalize(MAINSTAT_PROBABILITY_TABLE[slot])[mainStat];

  // exclude the main stat from the substat candidates
  let substatCandidates = normalize(
    removeKeys(SUBSTAT_PROBABILITY_TABLE, [mainStat])
  );

  // Then calculate the probability of each substat being rolled
  // exclude them from the substat candidates as we go so they don't get rolled again
  let totalProbabilitySoFar = 0;
  for (let substat of substats) {
    let substatProbability =
      substatCandidates[substat] / (1 - totalProbabilitySoFar);
    probability *= substatProbability;
    totalProbabilitySoFar += substatCandidates[substat];
    substatCandidates = normalize(removeKeys(substatCandidates, [substat]));
  }

  const remainingSlots = MAX_SUBSTATS - substats.length;

  if (remainingSlots === 0) {
    return probability;
  }

  // Recursive function to calculate the probability of any combination of substats
  const calculateRemainingProbability = (
    substatCandidates,
    remainingSlots,
    totalProbabilitySoFar = 0
  ) => {
    if (remainingSlots === 0) {
      return 1;
    }

    let totalProbability = 0;

    for (let substat in substatCandidates) {
      let substatProbability =
        substatCandidates[substat] / (1 - totalProbabilitySoFar);
      let newSubstatCandidates = normalize(
        removeKeys(substatCandidates, [substat])
      );
      totalProbability +=
        substatProbability *
        calculateRemainingProbability(
          newSubstatCandidates,
          remainingSlots - 1,
          totalProbabilitySoFar + substatCandidates[substat]
        );
    }

    return totalProbability;
  };

  // Calculate the probability of any combination of substats being rolled in the remaining slots
  let pRemaining = calculateRemainingProbability(
    substatCandidates,
    remainingSlots,
    totalProbabilitySoFar
  );

  // Multiply the probability of the specific substats by the probability of any combination of substats being rolled in the remaining slots
  probability *= pRemaining;

  return probability;
};

const generateRandomGoldRelic = () => {};

/**
 * Calculate the probability of at least one relic dropping from the correct set, given a desired main stat and substats combination and a certain amount of runs.
 * @param {string} slot Equipment slot
 * @param {string} mainStat Main stat of the relic
 * @param {string[]} substats Substats of the relic
 * @param {number} runs Amount of runs to consider
 * @returns The calculated proability and stamina cost
 */
function relicProbabilityGivenNumberOfRuns(slot, mainStat, substats, runs) {
  const isCavern = CAVERN_SLOTS_PROBABILITY_TABLE[slot] !== undefined;

  // Calculate the probability of a relic being the correct set and equipment slot
  const setAndSlotProbability =
    (isCavern
      ? CAVERN_SLOTS_PROBABILITY_TABLE[slot]
      : SU_SLOTS_PROBABILITY_TABLE[slot]) * DESIRABLE_SET_PROBABILITY;

  // Calculate the probability of a relic having the desired stats
  const relicProbability =
    calculateGoldRelicProbability(slot, mainStat, substats) *
    setAndSlotProbability;

  let totalProbability = 0;

  // Calculate the probability of at least one desirable relic with the correct stats for each drop amount
  for (let relicAmount in RUN_RELIC_AMOUNT_PROBABILITY_TABLE) {
    const p = atLeastOneSuccess(parseInt(relicAmount), relicProbability);

    // Take the weighted average of these probabilities based on the chances of each case occurring
    totalProbability += RUN_RELIC_AMOUNT_PROBABILITY_TABLE[relicAmount] * p;
  }

  const finalProbability = atLeastOneSuccess(runs, totalProbability);
  const stamCost = runs * RUN_STAMINA_COST;

  return { finalProbability, stamCost };
}

/**
 * Calculate the expected number of runs to have a target probability of getting a relic with the desired stats.
 * @param {*} slot
 * @param {*} mainStat
 * @param {*} substats
 * @param {*} targetProbability
 * @returns
 */
function relicRunsGivenProbability(
  slot,
  mainStat,
  substats,
  targetProbability
) {
  let runs = 0;
  let probability = 0;
  let staminaCost = 0;

  while (probability < targetProbability) {
    runs++;
    const results = relicProbabilityGivenNumberOfRuns(
      slot,
      mainStat,
      substats,
      runs
    );
    probability = results.finalProbability;
    staminaCost = results.stamCost;
  }

  return { runs, staminaCost };
}

export {
  calculateNewSubstatProbability,
  relicProbabilityGivenNumberOfRuns,
  relicRunsGivenProbability,
};
