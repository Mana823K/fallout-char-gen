import { Injectable } from "@angular/core";
import { GameplaySaveData, GameplayState } from "../models/gameplay/gameplay-state";
import { CharacterService } from "./character.service";
import { Character } from "../models/character/character";
import { InventoryService } from "./inventory.service";
import { BodyPart, CombatState } from "../models/gameplay/armor-state";

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
      this.state.poisonResistance = saveData.poisonResistance;
      this.state.combatState = new CombatState(saveData.combatState);

      this.updateCombatState();
    }
  }

  updateCombatState() {
    this.updateBodyPartState(this.state.combatState.head, "Head");
    this.updateBodyPartState(this.state.combatState.leftArm, "Arms");
    this.updateBodyPartState(this.state.combatState.rightArm, "Arms");
    this.updateBodyPartState(this.state.combatState.torso, "Torso");
    this.updateBodyPartState(this.state.combatState.leftLeg, "Legs");
    this.updateBodyPartState(this.state.combatState.rightLeg, "Legs");
  }

  private updateBodyPartState(part: BodyPart, name: string) {
    part.physicalRes = 0;
    part.energyRes = 0;
    part.radRes = 0;

    let armor = this.inventoryService.inventory.armor.filter(x => x.isEquipped && x.item.locationCovered.includes(name));
    armor.forEach(x => {
      if (x.item.physicalRes > part.physicalRes) part.physicalRes = x.item.physicalRes;
      if (x.item.energyRes > part.energyRes) part.energyRes = x.item.energyRes;
      if (x.item.radiationRes > part.radRes) part.radRes = x.item.radiationRes;
    });
  }

  save() {
    let saveData = new GameplaySaveData(this.state);
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(saveData));
  }
}
