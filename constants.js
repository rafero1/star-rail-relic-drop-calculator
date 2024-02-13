const CAVERN_SLOTS = {
  HEAD: "head",
  HANDS: "hands",
  CHEST: "chest",
  BOOTS: "boots",
};

const SU_SLOTS = {
  SPHERE: "sphere",
  ROPE: "rope",
};

const HEAD_CANDIDATES = {
  RAW_HP: "rhp",
};
const HANDS_CANDIDATES = {
  RAW_ATK: "ratk",
};
const CHEST_CANDIDATES = {
  HP: "hp",
  ATK: "atk",
  DEF: "def",
  CRIT_RATE: "cr",
  CRIT_DMG: "cd",
  EFFECT_HIT_RATE: "ehr",
};
const BOOTS_CANDIDATES = {
  HP: "hp",
  ATK: "atk",
  DEF: "def",
  SPEED: "spd",
};
const SPHERE_CANDIDATES = {
  HP: "hp",
  ATK: "atk",
  DEF: "def",
  PHYSICAL: "phys",
  FIRE: "fire",
  ICE: "ice",
  SHOCK: "shock",
  WIND: "wind",
  IMAGINARY: "imag",
  QUANTUM: "quan",
};
const ROPE_CANDIDATES = {
  HP: "hp",
  ATK: "atk",
  DEF: "def",
  BREAK_DMG: "break",
  ENERGY_RECHARGE: "er",
};

/**
 * Probability table of a gold relic of each slot dropping in a cavern run.
 * It seems to be the same for all slots.
 */
const CAVERN_SLOTS_PROBABILITY_TABLE = {
  head: 0.25,
  hands: 0.25,
  chest: 0.25,
  boots: 0.25,
};

/**
 * Probability table of a gold relic of each slot dropping in a SU run.
 * It seems to be the same for all slots.
 */
const SU_SLOTS_PROBABILITY_TABLE = {
  sphere: 0.5,
  rope: 0.5,
};

/**
 * Probability table of a gold relic of each slot rolling a certain main stat
 */
const MAINSTAT_PROBABILITY_TABLE = {
  head: {
    rhp: 1,
  },
  hands: {
    ratk: 1,
  },
  chest: {
    hp: 0.1911,
    atk: 0.2003,
    def: 0.1945,
    cr: 0.1084,
    cd: 0.1045,
    hl: 0.0972,
    ehr: 0.104,
  },
  boots: {
    hp: 0.2784,
    atk: 0.3006,
    def: 0.2995,
    spd: 0.1215,
  },
  sphere: {
    hp: 0.1179,
    atk: 0.1267,
    def: 0.117,
    phys: 0.0912,
    fire: 0.0912,
    ice: 0.0912,
    shock: 0.0912,
    wind: 0.0912,
    imag: 0.0912,
    quan: 0.0912,
  },
  rope: {
    hp: 0.2729,
    atk: 0.2774,
    def: 0.236,
    break: 0.1569,
    er: 0.0568,
  },
};

const SUBSTAT_CANDIDATES = {
  RAW_HP: "rhp",
  RAW_ATK: "ratk",
  RAW_DEF: "rdef",
  HP: "hp",
  ATK: "atk",
  DEF: "def",
  SPEED: "spd",
  CRIT_RATE: "cr",
  CRIT_DMG: "cd",
  EFFECT_HIT_RATE: "ehr",
  EFFECT_RES: "efr",
  BREAK_DMG: "break",
};

/**
 * Probability of substat rolls on a gold relic. The probability seems to be the same for all slots.
 * This is only the probability of a substat being rolled, aka. of it being present among the 4 substats.
 * Important: A relic cannot have the same substat twice, or the same substat as the main stat.
 */
const SUBSTAT_PROBABILITY_TABLE = {
  rhp: 0.0959,
  ratk: 0.0983,
  rdef: 0.0981,
  hp: 0.0974,
  atk: 0.1008,
  def: 0.0988,
  spd: 0.0427,
  cr: 0.0647,
  cd: 0.062,
  ehr: 0.0805,
  efr: 0.0794,
  break: 0.0814,
};

/**
 * Maximum number of substats a relic can have
 */
const MAX_SUBSTATS = 4;

/**
 * Probability of a substat being upgraded.
 * surprinsingly, it seems to be the same regardless of the substat.
 */
const SUB_STAT_UPGRADE_PROBABILITY = 0.25;

/**
 * Probability of a level 6 cavern stage dropping an X number of gold relics per run
 */
const RUN_RELIC_AMOUNT_PROBABILITY_TABLE = {
  2: 0.91,
  3: 0.09,
};

/**
 * Probability of a relic belonging to a desirable set.
 * Since each domain can drop 2 different sets, the probability is fixed at 0.5 for now.
 */
const DESIRABLE_SET_PROBABILITY = 0.5;

/**
 * How much stamina is available in a day
 */
const DAY_STAMINA = 240;

/**
 * How much stamina is used for a single run
 */
const RUN_STAMINA_COST = 40;

/**
 * How many runs can be done in a day
 */
const MAX_DAILY_RUNS = DAY_STAMINA / RUN_STAMINA_COST;

export {
  CAVERN_SLOTS_PROBABILITY_TABLE,
  SU_SLOTS_PROBABILITY_TABLE,
  MAINSTAT_PROBABILITY_TABLE,
  SUBSTAT_PROBABILITY_TABLE,
  MAX_SUBSTATS,
  SUB_STAT_UPGRADE_PROBABILITY,
  RUN_RELIC_AMOUNT_PROBABILITY_TABLE,
  DESIRABLE_SET_PROBABILITY,
  DAY_STAMINA,
  RUN_STAMINA_COST,
  MAX_DAILY_RUNS,
};
