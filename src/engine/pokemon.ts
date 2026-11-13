import { StatBlock, PokemonTuple, PokemonInstance } from "../types/pokemon";

export const createPokemonInstance = (
  name: string,
  level: number,
  types: PokemonTuple,
  baseStats: StatBlock,
): PokemonInstance => {
  return {
    name: name,
    level: level,
    types: types,
    stats: { ...baseStats },
  };
};

export const gengar = createPokemonInstance("Gengar", 50, ["Ghost", "Poison"], {
  hp: 60,
  atk: 65,
  def: 60,
  spa: 130,
  spd: 75,
  spe: 110,
});

export const sylveon = createPokemonInstance("Sylveon", 50, ["Fairy"], {
  hp: 95,
  atk: 65,
  def: 65,
  spa: 110,
  spd: 130,
  spe: 60,
});
