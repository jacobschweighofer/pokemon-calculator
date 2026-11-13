import type { PokemonInstance, DamageResult } from "./types/pokemon";
import { gengar, sylveon } from "./engine/pokemon";
import {
  calculateBaseDamage,
  applyStatStage,
  applyStab,
  getTypeMultiplier,
} from "./engine/damage";

const calculateDamage = (
  attacker: PokemonInstance,
  defender: PokemonInstance,
): DamageResult => {
  const typeMultiplier = getTypeMultiplier("Ghost", defender.types);
  if (typeMultiplier === 0) {
    return {
      minDamage: 0,
      maxDamage: 0,
      rolls: Array.from({ length: 16 }, () => 0),
    };
  }
  // Assumed Nasty Plot
  const newStat = applyStatStage(attacker.stats.spa, 2);

  let baseDamage = Math.floor(
    calculateBaseDamage(
      attacker.level,
      80, // Attack power assumed here
      newStat, // Assumed special or physical attack
      defender.stats.spd,
    ),
  );

  // Assumed it's STAB, since we don't have any moves yet.
  let modifiedDamage = Math.floor(applyStab(baseDamage));

  modifiedDamage = Math.floor(
    getTypeMultiplier("Ghost", defender.types) * modifiedDamage,
  );

  const rolls = Array.from({ length: 16 }, (_, index) => index + 85);

  const finalDamageRolls = rolls.map((roll) => {
    return Math.floor((modifiedDamage * roll) / 100);
  });

  return {
    minDamage: Math.min(...finalDamageRolls),
    maxDamage: Math.max(...finalDamageRolls),
    rolls: finalDamageRolls,
  };
};

const result = calculateDamage(gengar, sylveon);

console.log(result);

// Tomorrow, before doing any CLI stuff, let's make this more dynamic
