import { TYPE_EFFECTIVENESS_MATRIX, STAT_STAGES } from "./matrices";
import type {
  PokemonType,
  ModifierCalculator,
  StatusCondition,
  HeldItem,
  Stage,
} from "../types/pokemon";

export const getTypeMultiplier = (
  attackerType: PokemonType | PokemonType[],
  defenderType: PokemonType | PokemonType[],
): number => {
  const attacker = Array.isArray(attackerType) ? attackerType : [attackerType];
  const defender = Array.isArray(defenderType) ? defenderType : [defenderType];

  let totalMultiplier = 1;

  for (const offensiveType of attacker) {
    for (const defensiveType of defender) {
      const multiplier =
        TYPE_EFFECTIVENESS_MATRIX[offensiveType]?.[defensiveType] ?? 1;
      totalMultiplier *= multiplier;
    }
  }
  return totalMultiplier;
};

export const createModifierFactory = (
  multiplier: number,
): ModifierCalculator => {
  return (baseDamage: number) => Math.floor(baseDamage * multiplier);
};

export const applyStab = createModifierFactory(1.5);
export const applyLifeOrb = createModifierFactory(2.0);

const getStatusMultiplier = (
  status: StatusCondition,
  isPhysical: boolean,
): number => {
  return status === "Burn" && isPhysical === true ? 0.5 : 1;
};

// "damage" simply refers to the final damage, while "attack" is the attack stat.
const getItemMultiplier = (
  item: HeldItem,
  damageType: "attack" | "damage",
): number => {
  if (item === "ChoiceBand" && damageType === "attack") return 1.5;

  if (item === "LifeOrb" && damageType === "damage") return 1.3;

  return 1;
};

export const calculateBaseDamage = (
  level: number,
  basePower: number,
  attack: number,
  defense: number,
): number => {
  if (defense <= 0) {
    defense = 1;
  }

  const step1 = Math.floor((2 * level) / 5) + 2;

  const step2 = Math.floor((step1 * basePower * attack) / defense);

  return Math.floor(step2 / 50) + 2;
};

const applyStatStage = (baseStat: number, stage: Stage): number => {
  const { numerator, denominator } = STAT_STAGES[stage];
  // Always multiply before you divide, and floor only at the final step.
  return Math.floor((baseStat * numerator) / denominator);
};

const result = applyStatStage(90, 2);
console.log(result);
