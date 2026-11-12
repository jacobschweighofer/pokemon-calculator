export type StatBlock = {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
};

export type PokemonType =
  | "Normal"
  | "Fire"
  | "Water"
  | "Grass"
  | "Electric"
  | "Ice"
  | "Fighting"
  | "Poison"
  | "Ground"
  | "Flying"
  | "Psychic"
  | "Bug"
  | "Rock"
  | "Ghost"
  | "Dragon"
  | "Dark"
  | "Steel"
  | "Fairy";

export type PokemonTuple = readonly [
  primary: PokemonType,
  secondary?: PokemonType,
];

export type PokemonInstance = {
  name: string;
  level: number;
  types: PokemonTuple;
  stats: StatBlock;
};

export type TypeMultiplier = 0 | 0.5 | 2;

export type TypeEffectivenessMatrix = Record<
  PokemonType,
  Partial<Record<PokemonType, TypeMultiplier>>
>;

export type ModifierCalculator = (baseDamage: number) => number;

export type StatusCondition =
  | "Burn"
  | "Paralysis"
  | "Freeze"
  | "Poison"
  | "Sleep"
  | "None";

export type HeldItem = "ChoiceBand" | "LifeOrb" | "Leftovers" | "None";
