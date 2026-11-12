import { TYPE_EFFECTIVENESS_MATRIX } from "./matrices";
import type {
  PokemonType,
  ModifierCalculator,
  StatusCondition,
  HeldItem,
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
