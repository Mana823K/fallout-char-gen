import { Armor } from "../database/armor";
import { Weapon } from "../database/weapon";
import { CombatState } from "./armor-state";

export class GameplayState {
  xp: number = 0;
  hp: number = 0;
  luckPoints: number = 0;
  poisonDuration: number = 0;
  
  armor: Armor[] = [];
  bodyState: CombatState = new CombatState();
  markedWeapons: Weapon[] = [];

  constructor(maxHP: number, luck: number) {
    this.hp = maxHP;
    this.luckPoints = luck;
  }
}

export class GameplaySaveData {
  xp: number;
  hp: number;
  luckPoints: number;
  poisonDuration: number;
  
  armor: string[];
  markedWeapons: string[];

  constructor(original: GameplayState) {
    this.xp = original.xp;
    this.hp = original.hp;
    this.luckPoints = original.luckPoints;
    this.poisonDuration = original.poisonDuration;
    this.armor = original.armor.map(x => x.name);
    this.markedWeapons = original.markedWeapons.map(x => x.name);
  }
}