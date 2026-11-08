import { StatBlock, PokemonTuple, PokemonInstance } from "./types/pokemon";

const createPokemonInstance = (
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

const newPokemon = createPokemonInstance("Renamon", 50, ["Normal"], {
  hp: 100,
  atk: 100,
  def: 100,
  spa: 100,
  spd: 100,
  spe: 100,
});

console.log(newPokemon);
