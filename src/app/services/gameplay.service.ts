import { Injectable } from "@angular/core";
import { GameplaySaveData, GameplayState } from "../models/gameplay/gameplay-state";
import { CharacterService } from "./character.service";
import { Character } from "../models/character/character";
import { InventoryService } from "./inventory.service";
import { CombatState } from "../models/gameplay/armor-state";

@Injectable({
  providedIn: "root"
})
export class GameplayService {
  readonly STORAGE_NAME = "GameplayData";
  state: GameplayState;

  get character(): Character { return this.characterService.character; }

  constructor(private characterService: CharacterService, private inventoryService: InventoryService) {
    this.state = new GameplayState(this.character.stats.maxHp, this.character.special.luck);
    this.init();
  }

  init() {
    let storedData = localStorage.getItem(this.STORAGE_NAME);
    if (storedData) {
      let saveData: GameplaySaveData = JSON.parse(storedData);
      
      this.state.hp = saveData.hp;
      this.state.xp = saveData.xp;
      this.state.luckPoints = saveData.luckPoints;
      this.state.poisonDuration = saveData.poisonDuration;
      this.state.combatState = new CombatState(saveData.combatState);
      this.state.armor = this.inventoryService.inventory.armor
          .filter(x => saveData.armor.includes(x.item.name))
          .map(x => x.item);
      this.state.markedWeapons = this.inventoryService.inventory.weapons
          .filter(x => saveData.markedWeapons.includes(x.item.name))
          .map(x => x.item);
      
      this.updateCombatState();
    }
  }

  updateCombatState() {
    // todo
  }

  save() {
    let saveData = new GameplaySaveData(this.state);
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(saveData));
  }
}
