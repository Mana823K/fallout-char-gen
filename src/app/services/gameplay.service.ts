import { Injectable } from "@angular/core";
import { GameplaySaveData, GameplayState } from "../models/gameplay/gameplay-state";
import { CharacterService } from "./character.service";
import { Character } from "../models/character/character";
import { InventoryService } from "./inventory.service";
import { BodyPart, CombatState } from "../models/gameplay/combat-state";
import { EquippedArmor } from "../models/gameplay/equipped-armor";

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
      this.state.armor = saveData.armor.flatMap(x => {
        let invArmor = this.inventoryService.inventory.armor.find(y => y.item.name == x.armor)?.item;
        if (invArmor)
          return new EquippedArmor(invArmor, x.side);
        return [];
      });
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

  private updateBodyPartState(part: BodyPart, name: string, side?: "Left" | "Right") {
    part.physicalRes = 0;
    part.energyRes = 0;
    part.radRes = 0;

    let armor = this.state.armor.filter(x => x.side == side && x.armor.locationCovered.includes(name));
    armor.forEach(x => {
      if (x.armor.physicalRes > part.physicalRes) part.physicalRes = x.armor.physicalRes;
      if (x.armor.energyRes > part.energyRes) part.energyRes = x.armor.energyRes;
      if (x.armor.radiationRes > part.radRes) part.radRes = x.armor.radiationRes;
    });

    part.clothing = armor.filter(x => x.armor.type == "Clothing").map(x => x.armor.name);
    part.armor = armor.filter(x => x.armor.type != "Clothing").map(x => x.armor.name);
  }

  save() {
    let saveData = new GameplaySaveData(this.state);
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(saveData));
  }
}
