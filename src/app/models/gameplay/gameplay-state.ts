import { CombatState, CombatStateSaveData } from "./armor-state";

export class GameplayState {
  xp: number = 0;
  hp: number = 0;
  luckPoints: number = 0;
  poisonResistance: number = 0;

  combatState: CombatState = new CombatState();

  constructor(maxHP: number, luck: number) {
    this.hp = maxHP;
    this.luckPoints = luck;
  }
}

export class GameplaySaveData {
  xp: number;
  hp: number;
  luckPoints: number;
  poisonResistance: number;

  combatState: CombatStateSaveData;

  constructor(original: GameplayState) {
    this.xp = original.xp;
    this.hp = original.hp;
    this.luckPoints = original.luckPoints;
    this.poisonResistance = original.poisonResistance;
    this.combatState = new CombatStateSaveData(original.combatState);
  }
}
