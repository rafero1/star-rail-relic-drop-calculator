export const RELICS = [
  {
    id: "band-of-thunder",
    name: "Band of Sizzling Thunder",
    setEffect1: "Increases Lightning DMG by 10%",
    setEffect2:
      "When the wearer uses Skill, increases the wearer's ATK by 20% for 1 turn(s)",
    isCavern: true,
  },
  {
    id: "eagle",
    name: "Eagle of Twilight Line",
    setEffect1: "Increases Wind DMG by 10%",
    setEffect2:
      "After the wearer uses Ultimate, their action is Advanced Forward by 25%",
    isCavern: true,
  },
];

export const domains = [
  { name: "Cavern", drops: ["band-of-thunder", "eagle"], isCavern: true },
];
