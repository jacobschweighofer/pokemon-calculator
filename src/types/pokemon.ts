import type { PokemonMoves } from "../engine/moves";

export type StatBlock = {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
};

export type Stats = keyof StatBlock;

export type StatChangeStats = Exclude<Stats, "hp">;

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

export type PokemonTuple =
  | readonly [primary: PokemonType]
  | readonly [primary: PokemonType, secondary: PokemonType];

export type PokemonMoveList = readonly [PokemonMoves, ...PokemonMoves[]];

export type PokemonInstance<TMoves extends PokemonMoveList = PokemonMoveList> =
  {
    name: string;
    level: number;
    types: PokemonTuple;
    stats: StatBlock;
    moves: TMoves;
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

export type Stage = 6 | 5 | 4 | 3 | 2 | 1 | 0 | -1 | -2 | -3 | -4 | -5 | -6;
export type Fraction = { numerator: number; denominator: number };

export type StatStages = Record<Stage, Fraction>;

export interface DamageResult {
  minDamage: number;
  maxDamage: number;
  rolls: number[];
}

export type PokemonMove = {
  type: PokemonType;
  power: number;
  category: "Physical" | "Special" | "Status";
};

export type PokemonMoveRecord = Record<string, PokemonMove>;
