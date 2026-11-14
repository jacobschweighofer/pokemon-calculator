import type { PokemonType, PokemonMoveRecord } from "../types/pokemon";

export const pokemonMoves = {
  sludge_bomb: {
    type: "Poison",
    power: 90,
    category: "Special",
  },
  shadow_ball: {
    type: "Ghost",
    power: 80,
    category: "Special",
  },
  dazzling_gleam: {
    type: "Fairy",
    power: 80,
    category: "Special",
  },
  double_edge: {
    type: "Normal",
    power: 120,
    category: "Physical",
  },
  taunt: {
    type: "Dark",
    power: 0,
    category: "Status",
  },
} as const satisfies PokemonMoveRecord;

export type PokemonMoves = keyof typeof pokemonMoves;

export const getMove = (move: PokemonMoves) => pokemonMoves[move];
