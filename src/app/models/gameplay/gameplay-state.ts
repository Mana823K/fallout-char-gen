import { CombatState, CombatStateSaveData } from "./combat-state";
import { EquippedArmor, EquippedArmorSaveData } from "./equipped-armor";

export class GameplayState {
  xp: number = 0;
  hp: number = 0;
  luckPoints: number = 0;
  poisonResistance: number = 0;

  armor: EquippedArmor[] = [];
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
  armor: EquippedArmorSaveData[];
  poisonResistance: number;

  combatState: CombatStateSaveData;

  constructor(original: GameplayState) {
    this.xp = original.xp;
    this.hp = original.hp;
    this.luckPoints = original.luckPoints;
    this.poisonResistance = original.poisonResistance;
    this.armor = original.armor.map(x => new EquippedArmorSaveData(x.armor.name, x.side));
    this.combatState = new CombatStateSaveData(original.combatState);
  }
}
