import {
  StatBlock,
  PokemonTuple,
  PokemonInstance,
  PokemonMoveList,
} from "../types/pokemon";
import { PokemonMoves } from "./moves";

// Add available moves to Pokemon. Add base stats and base available moves for all Pokemon

export const createPokemonInstance = <const TMoves extends PokemonMoveList>(
  name: string,
  level: number,
  types: PokemonTuple,
  baseStats: StatBlock,
  moves: TMoves,
): PokemonInstance => {
  return {
    name: name,
    level: level,
    types: types,
    stats: { ...baseStats },
    moves,
  };
};

export const gengar = createPokemonInstance(
  "Gengar",
  50,
  ["Ghost", "Poison"],
  {
    hp: 60,
    atk: 65,
    def: 60,
    spa: 130,
    spd: 75,
    spe: 110,
  },
  ["shadow_ball", "sludge_bomb"],
);

export const sylveon = createPokemonInstance(
  "Sylveon",
  50,
  ["Fairy"],
  {
    hp: 95,
    atk: 65,
    def: 65,
    spa: 110,
    spd: 130,
    spe: 60,
  },
  ["dazzling_gleam", "double_edge", "taunt"],
);
