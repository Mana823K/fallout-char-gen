import { Component } from '@angular/core';
import { Weapon } from '../../../models/database/weapon';
import { GameplayService } from '../../../services/gameplay.service';
import { InventoryService } from '../../../services/inventory.service';
import { CharacterService } from '../../../services/character.service';
import { SpecialEnum } from '../../../models/character/special-enum';
import { TooltipedListCellComponent } from "../../common/tooltiped-list-cell/tooltiped-list-cell.component";
import { TooltipTypeEnum } from '../../../models/database/tooltip';
import { Router } from '@angular/router';
import { NumberInputComponent } from "../../form/number-input/number-input.component";
import { SelectComponent } from '../../form/select/select.component';

@Component({
  selector: 'app-weapon-sheet',
  imports: [TooltipedListCellComponent, NumberInputComponent, SelectComponent],
  templateUrl: './weapon-sheet.component.html',
  styleUrl: './weapon-sheet.component.scss'
})
export class WeaponSheetComponent {
  readonly TooltipTypeEnum = TooltipTypeEnum;
  readonly ammoWeaponTypes = ["Throwing", "Explosive"];

  weapons: Weapon[];

  constructor(private gameplayService: GameplayService,
              private characterService: CharacterService,
              private inventoryService: InventoryService,
              private router: Router) {
    this.weapons = this.inventoryService.inventory.weapons.filter(x => x.isEquipped).map(x => x.item);
  }

  save() {
    this.gameplayService.save();
  }

  getAmmoCount(weapon: Weapon) {
    if (this.ammoWeaponTypes.includes(weapon.type)) {
      let inventoryItem = this.inventoryService.inventory.weapons.find(x => x.item.name == weapon.name);
      return inventoryItem?.amount;
    }

    let result = [];
    for (let ammoType of weapon.ammo) {
      let count = 0
      this.inventoryService.inventory.ammo.filter(x => x.item.name == ammoType).forEach(x => count += x.amount);
      result.push(count);
    }
    return result.length > 0 ? result.join(" + ") : "-";
  }

  getTag(weapon: Weapon): string {
    let skill;
    if (weapon.type == "Bow") {
      skill = this.characterService.character.skills.find(x => x.name == "Athletics");
    }
    else {
      skill = this.characterService.character.skills.find(x => x.name == weapon.type);
    }
    return skill?.isTagged ? `\u2713 (${skill.ranks})` : "";
  }

  getTargetNumber(weapon: Weapon) {
    let skill;
    if (weapon.type == "Bow") {
      skill = this.characterService.character.skills.find(x => x.name == "Athletics");
      if (!skill)
        return 0;
      return this.characterService.character.getSpecialPoints(SpecialEnum.AGI) + skill.ranks;
    }
    else {
      skill = this.characterService.character.skills.find(x => x.name == weapon.type);
      if (!skill)
        return 0;

      return this.characterService.character.getSpecialPoints(skill.attribute) + skill.ranks;
    }
  }

  useAmmo(ammo: string, amountInput: NumberInputComponent) {
    let inventoryAmmo = this.inventoryService.inventory.ammo.find(x => x.item.name == ammo);
    if (inventoryAmmo) {
      inventoryAmmo.amount -= amountInput.value;
      amountInput.value = 1;
    }
  }

  navigateToInventory() {
    this.router.navigate(["inventory", "weapons"]);
  }
}
