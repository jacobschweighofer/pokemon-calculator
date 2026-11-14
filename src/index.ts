import type {
  StatChangeStats,
  PokemonInstance,
  DamageResult,
  PokemonType,
  PokemonTuple,
  Stage,
} from "./types/pokemon";
import { gengar, sylveon } from "./engine/pokemon";
import {
  calculateBaseDamage,
  applyStatStage,
  applyCritical,
  applyStab,
  getTypeMultiplier,
  normalizeTypes,
} from "./engine/damage";
import { getMove } from "./engine/moves";

export const isStab = (
  attackerTypes: PokemonType | PokemonTuple,
  moveType: PokemonType,
): boolean => {
  let attacker = normalizeTypes(attackerTypes);
  return attacker.some((type) => type === moveType);
};

const calculateDamage = <TAttacker extends PokemonInstance>(
  attacker: TAttacker,
  defender: PokemonInstance,
  moveName: TAttacker["moves"][number],
  statStagesAttacker?: Partial<Record<StatChangeStats, Stage>>,
  statStagesDefender?: Partial<Record<StatChangeStats, Stage>>,
  isCritical?: boolean,
): DamageResult => {
  const move = getMove(moveName);

  const typeMultiplier = getTypeMultiplier(move.type, defender.types);
  if (typeMultiplier === 0 || move.category === "Status") {
    return {
      minDamage: 0,
      maxDamage: 0,
      rolls: Array.from({ length: 16 }, () => 0),
    };
  }

  const statOffensiveKey = move.category === "Special" ? "spa" : "atk";
  const statDefensiveKey = move.category === "Special" ? "spd" : "def";
  const currentOffensiveStage = statStagesAttacker?.[statOffensiveKey] ?? 0;
  const currentDefensiveStage = statStagesDefender?.[statDefensiveKey] ?? 0;

  let effectiveOffensiveStat = 0;

  if (isCritical) {
    effectiveOffensiveStat = applyStatStage(
      attacker.stats[statOffensiveKey],
      currentOffensiveStage < 0 ? 0 : currentOffensiveStage,
    );
  } else {
    effectiveOffensiveStat = applyStatStage(
      attacker.stats[statOffensiveKey],
      currentOffensiveStage,
    );
  }

  let effectiveDefensiveStat = 0;

  if (isCritical) {
    effectiveDefensiveStat = applyStatStage(
      defender.stats[statDefensiveKey],
      currentDefensiveStage > 0 ? 0 : currentDefensiveStage,
    );
  } else {
    effectiveDefensiveStat = applyStatStage(
      defender.stats[statDefensiveKey],
      currentDefensiveStage,
    );
  }

  let baseDamage = Math.floor(
    calculateBaseDamage(
      attacker.level,
      move.power,
      effectiveOffensiveStat,
      effectiveDefensiveStat,
    ),
  );

  let modifiedDamage = baseDamage;

  if (isCritical) {
    modifiedDamage = Math.floor(applyCritical(modifiedDamage));
  }

  if (isStab(attacker.types, move.type)) {
    modifiedDamage = Math.floor(applyStab(modifiedDamage));
  }

  modifiedDamage = Math.floor(modifiedDamage * typeMultiplier);

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

const result = calculateDamage(
  gengar,
  sylveon,
  "sludge_bomb",
  { spa: 2 },
  { spd: 6 },
  false,
);
const result2 = calculateDamage(
  gengar,
  sylveon,
  "sludge_bomb",
  { spa: 2 },
  { spd: 6 },
  true,
);

console.log(result);
console.log(result2);
